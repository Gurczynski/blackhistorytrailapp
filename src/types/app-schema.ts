export interface AppSchemaBlock {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

export interface AppSchemaNavigationItem {
  name: string;
  screenId: string;
  tabIcon?: string;
  tabLabel?: string;
}

export interface AppSchemaNavigation {
  type: 'tabs' | 'stack';
  items: AppSchemaNavigationItem[];
}

export interface AppSchemaScreen {
  id: string;
  title: string;
  blocks: AppSchemaBlock[];
}

export interface AppSchema {
  version: number;
  updatedAt: string;
  navigation: AppSchemaNavigation;
  screens: AppSchemaScreen[];
}