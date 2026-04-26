import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

export interface ProjectRow {
  id: string;
  name: string;
  description: string | null;
  status: string;
  icon: string | null;
  expo_project_id: string | null;
  github_repo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageRow {
  id: string;
  project_id: string;
  title: string;
  slug: string;
  status: string;
  sort_order: number;
  nav_config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ContentBlockRow {
  id: string;
  page_id: string;
  type: string;
  sort_order: number;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ThemeTokens {
  colors: Record<string, string>;
  typography: Record<string, string | number>;
  spacing: Record<string, number>;
}

export interface FeatureFlagRow {
  id: string;
  project_id: string;
  name: string;
  description: string | null;
  enabled: boolean;
}

export interface AppConfig {
  project: ProjectRow | null;
  pages: PageRow[];
  blocksByPage: Record<string, ContentBlockRow[]>;
  theme: ThemeTokens;
  featureFlags: FeatureFlagRow[];
  apiKeys: Record<string, string>;
  loading: boolean;
  error: string | null;
}

export function useAppConfig(): AppConfig {
  const [project, setProject] = useState<ProjectRow | null>(null);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [blocksByPage, setBlocksByPage] = useState<Record<string, ContentBlockRow[]>>({});
  const [theme, setTheme] = useState<ThemeTokens>({ colors: {}, typography: {}, spacing: {} });
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagRow[]>([]);
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const appName = process.env.EXPO_PUBLIC_APP_NAME || 'Black History Trail App';
      const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

      // Fetch API keys and full config from Supabase edge function (secrets stored in Supabase, not in app)
      let edgeConfig: any = null;
      try {
        const res = await fetch(
          `${supabaseUrl}/functions/v1/get-app-config?slug=${encodeURIComponent(appName)}`,
          { headers: { Authorization: `Bearer ${supabaseAnonKey}` } }
        );
        if (res.ok) {
          edgeConfig = await res.json();
        }
      } catch {
        // Edge function may not be deployed yet — fall through to direct Supabase queries
      }

      // Use edge config API keys if available
      if (edgeConfig?.api_keys) {
        setApiKeys(edgeConfig.api_keys);
      }

      // 1. Find the project
      let projectData: ProjectRow | null = null;
      if (edgeConfig?.project) {
        projectData = edgeConfig.project as ProjectRow;
        setProject(projectData);
      } else {
        const { data: projects, error: projectErr } = await supabase
          .from('projects')
          .select('*')
          .eq('name', appName)
          .limit(1);

        if (projectErr) throw projectErr;
        if (!projects || projects.length === 0) throw new Error(`Project "${appName}" not found`);
        projectData = projects[0] as ProjectRow;
        setProject(projectData);
      }

      if (!projectData) throw new Error('Could not load project');

      // 2. Fetch published pages with nav_config
      if (edgeConfig?.pages) {
        setPages(edgeConfig.pages as PageRow[]);
      } else {
        const { data: pagesData, error: pagesErr } = await supabase
          .from('pages')
          .select('*')
          .eq('project_id', projectData.id)
          .eq('status', 'published')
          .order('sort_order', { ascending: true });
        if (pagesErr) throw pagesErr;
        setPages((pagesData || []) as PageRow[]);
      }

      // 2. Fetch published pages with nav_config
      const { data: pagesData, error: pagesErr } = await supabase
        .from('pages')
        .select('*')
        .eq('project_id', projectData.id)
        .eq('status', 'published')
        .order('sort_order', { ascending: true });

      if (pagesErr) throw pagesErr;
      const pageRows = (pagesData || []) as PageRow[];
      setPages(pageRows);

      // 3. Fetch content blocks for all pages
      const { data: blocksData, error: blocksErr } = await supabase
        .from('content_blocks')
        .select('*')
        .in('page_id', pageRows.map((p) => p.id))
        .order('sort_order', { ascending: true });

      if (blocksErr) throw blocksErr;

      const grouped: Record<string, ContentBlockRow[]> = {};
      for (const block of (blocksData || []) as ContentBlockRow[]) {
        if (!grouped[block.page_id]) grouped[block.page_id] = [];
        grouped[block.page_id].push(block);
      }
      setBlocksByPage(grouped);

      // 4. Fetch theme
      const { data: themeData, error: themeErr } = await supabase
        .from('themes')
        .select('tokens')
        .eq('project_id', projectData.id)
        .single();

      if (!themeErr && themeData) {
        setTheme(themeData.tokens as unknown as ThemeTokens);
      }

      // 5. Fetch enabled feature flags
      const { data: flagsData, error: flagsErr } = await supabase
        .from('feature_flags')
        .select('*')
        .eq('project_id', projectData.id)
        .eq('enabled', true);

      if (!flagsErr && flagsData) {
        setFeatureFlags(flagsData as FeatureFlagRow[]);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load app configuration');
    } finally {
      setLoading(false);
    }
  };

  return { project, pages, blocksByPage, theme, featureFlags, apiKeys, loading, error };
}
