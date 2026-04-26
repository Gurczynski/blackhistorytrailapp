import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { ScreenRenderer } from '../renderers/ScreenRenderer';
import { useAppTheme } from '../providers/ThemeProvider';
import type { PageRow, ContentBlockRow, AppConfig } from '../hooks/useAppConfig';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface NavConfig {
  navType?: string;
  tabIcon?: string;
  tabLabel?: string;
  headerTitle?: string;
  headerShown?: boolean;
  customComponent?: string;
}

function parseNavConfig(page: PageRow): NavConfig {
  return (page.nav_config || {}) as NavConfig;
}

function ScreenWrapper({
  pageId,
  blocksByPage,
}: {
  pageId: string;
  blocksByPage: Record<string, ContentBlockRow[]>;
}) {
  const blocks = blocksByPage[pageId] || [];
  return <ScreenRenderer blocks={blocks} />;
}

function TabScrren({
  route,
  tabPages,
  blocksByPage,
  customScreens,
}: {
  route: { name: string };
  tabPages: PageRow[];
  blocksByPage: Record<string, ContentBlockRow[]>;
  customScreens: Record<string, React.FC<any>>;
}) {
  const page = tabPages.find((p) => p.slug === route.name);
  if (!page) return <ScreenRenderer blocks={[]} />;
  const nav = parseNavConfig(page);

  if (nav.customComponent && customScreens[nav.customComponent]) {
    const CustomComp = customScreens[nav.customComponent];
    return <CustomComp />;
  }

  return <ScreenWrapper pageId={page.id} blocksByPage={blocksByPage} />;
}

function StackScrren({
  route,
  stackPages,
  blocksByPage,
  customScreens,
}: {
  route: { name: string };
  stackPages: PageRow[];
  blocksByPage: Record<string, ContentBlockRow[]>;
  customScreens: Record<string, React.FC<any>>;
}) {
  const page = stackPages.find((p) => p.slug === route.name);
  if (!page) return <ScreenRenderer blocks={[]} />;
  const nav = parseNavConfig(page);

  if (nav.customComponent && customScreens[nav.customComponent]) {
    const CustomComp = customScreens[nav.customComponent];
    return <CustomComp />;
  }

  return <ScreenWrapper pageId={page.id} blocksByPage={blocksByPage} />;
}

export function DynamicNavigator({
  config,
  customScreens = {},
}: {
  config: AppConfig;
  customScreens?: Record<string, React.FC<any>>;
}) {
  const { Colors } = useAppTheme();

  const { tabPages, stackPages } = useMemo(() => {
    const tabs: PageRow[] = [];
    const stacks: PageRow[] = [];
    for (const page of config.pages) {
      const nav = parseNavConfig(page);
      if (nav.navType === 'tab') {
        tabs.push(page);
      } else {
        stacks.push(page);
      }
    }
    return {
      tabPages: tabs.sort((a, b) => a.sort_order - b.sort_order),
      stackPages: stacks.sort((a, b) => a.sort_order - b.sort_order),
    };
  }, [config.pages]);

  if (config.loading) {
    return <ScreenRenderer blocks={[]} loading />;
  }

  if (config.error) {
    return (
      <ScreenRenderer
        blocks={[
          {
            id: 'error',
            page_id: '',
            type: 'text',
            sort_order: 0,
            data: { content: `Error: ${config.error}` },
            created_at: '',
            updated_at: '',
          },
        ]}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs">
          {() => (
            <Tab.Navigator
              screenOptions={({ route }) => {
                const page = tabPages.find((p) => p.slug === route.name);
                const nav = parseNavConfig(page!);
                return {
                  tabBarIcon: ({
                    focused,
                    color: iconColor,
                    size,
                  }: {
                    focused: boolean;
                    color: string;
                    size: number;
                  }) => {
                    const iconName = nav.tabIcon || 'help';
                    return (
                      <Icon
                        name={iconName as any}
                        size={size}
                        color={focused ? Colors.accent : iconColor}
                      />
                    );
                  },
                  tabBarLabel: nav.tabLabel || page?.title || route.name,
                  tabBarActiveTintColor: Colors.accent,
                  tabBarInactiveTintColor: Colors.mutedForeground,
                  tabBarStyle: {
                    backgroundColor: Colors.navBackground,
                    borderTopColor: Colors.mutedForeground + '30',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                  },
                  tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
                  headerShown: false,
                };
              }}
            >
              {tabPages.map((page) => (
                <Tab.Screen
                  key={page.id}
                  name={page.slug}
                  options={{
                    tabBarLabel: parseNavConfig(page).tabLabel || page.title,
                  }}
                >
                  {(props: any) => (
                    <TabScrren
                      route={props.route}
                      tabPages={tabPages}
                      blocksByPage={config.blocksByPage}
                      customScreens={customScreens}
                    />
                  )}
                </Tab.Screen>
              ))}
            </Tab.Navigator>
          )}
        </Stack.Screen>

        {stackPages.map((page) => {
          const nav = parseNavConfig(page);
          return (
            <Stack.Screen
              key={page.id}
              name={page.slug}
              options={{
                headerShown: nav.headerShown ?? true,
                headerTitle: nav.headerTitle || page.title,
                headerTintColor: Colors.primary,
                headerStyle: { backgroundColor: Colors.background },
              }}
            >
              {(props: any) => (
                <StackScrren
                  route={props.route}
                  stackPages={stackPages}
                  blocksByPage={config.blocksByPage}
                  customScreens={customScreens}
                />
              )}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
