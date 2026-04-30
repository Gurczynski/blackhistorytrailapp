import type { AppConfig } from '../hooks/useAppConfig';
import type { AppSchema, AppSchemaScreen, AppSchemaNavigationItem } from '../types/app-schema';

export function appConfigToSchema(config: AppConfig): AppSchema {
  const screens: AppSchemaScreen[] = config.pages.map(page => ({
    id: page.id,
    title: page.title,
    blocks: (config.blocksByPage[page.id] || []).map(block => ({
      id: block.id,
      type: block.type,
      props: block.data,
    })),
  }));

  const navItems: AppSchemaNavigationItem[] = config.pages.map(page => {
    const navConfig = page.nav_config as Record<string, unknown>;
    return {
      name: page.slug,
      screenId: page.id,
      tabIcon: navConfig?.tabIcon as string | undefined,
      tabLabel: navConfig?.tabLabel as string | undefined,
    };
  });

  const tabItems = navItems.filter((_, idx) => {
    const page = config.pages[idx];
    const navConfig = page.nav_config as Record<string, unknown>;
    return navConfig?.navType === 'tab';
  });

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    navigation: {
      type: tabItems.length > 0 ? 'tabs' : 'stack',
      items: navItems,
    },
    screens,
  };
}