import NetInfo from '@react-native-community/netinfo';
import type { AppSchema } from '../types/app-schema';
import { storage } from './storage';
import { supabase } from '../supabase/client';

export { storage };

export async function fetchRemoteSchema(
  projectId: string,
  isDraft = false,
  retryCount = 3
): Promise<AppSchema | null> {
  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      const { data, error } = await supabase
        .from('app_schemas')
        .select('schema_json, version')
        .eq('project_id', projectId)
        .eq('is_published', !isDraft)
        .single();

      if (error || !data) return null;
      return data.schema_json as AppSchema;
    } catch (err) {
      if (attempt === retryCount - 1) return null;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }
  return null;
}

export async function syncSchema(
  projectId: string,
  isDraft = false
): Promise<AppSchema | null> {
  const netInfo = await NetInfo.fetch();
  if (!netInfo.isConnected) {
    return storage.getSchema();
  }

  const remoteSchema = await fetchRemoteSchema(projectId, isDraft);
  if (!remoteSchema) return storage.getSchema();

  const localSchema = await storage.getSchema();
  if (!localSchema || remoteSchema.version > localSchema.version) {
    await storage.saveSchema(remoteSchema);
    return remoteSchema;
  }

  return localSchema;
}

export function startBackgroundSync(
  projectId: string,
  onUpdate: (schema: AppSchema) => void
) {
  let debounceTimer: ReturnType<typeof setTimeout>;
  const listener = NetInfo.addEventListener(async (state) => {
    if (state.isConnected) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const remote = await fetchRemoteSchema(projectId);
        const local = await storage.getSchema();
        if (remote && (!local || remote.version > local.version)) {
          await storage.saveSchema(remote);
          onUpdate(remote);
        }
      }, 2000);
    }
  });

  return () => {
    clearTimeout(debounceTimer);
    listener();
  };
}
