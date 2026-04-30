import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import DynamicScreen from '../screens/DynamicScreen';
import { useAppTheme } from '../providers/ThemeProvider';
import type { AppSchema, AppSchemaScreen } from '../types/app-schema';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface DynamicNavigatorProps {
  schema: AppSchema;
  loading: boolean;
  error: string | null;
}

function LoadingScreen() {
  const { Colors } = useAppTheme();
  return (
    <DynamicScreen
      screen={{
        id: 'loading',
        title: 'Loading',
        blocks: [{ id: '1', type: 'text', props: { content: 'Loading...' } }],
      }}
    />
  );
}

function ErrorScreen({ errorMsg }: { errorMsg?: string }) {
  return (
    <DynamicScreen
      screen={{
        id: 'error',
        title: 'Error',
        blocks: [{ id: '1', type: 'text', props: { content: errorMsg || 'An error occurred' } }],
      }}
    />
  );
}

function TabNavigator({ schema, schemaScreens }: { schema: AppSchema; schemaScreens: Record<string, AppSchemaScreen> }) {
  const { Colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const item = schema.navigation.items.find(i => i.name === route.name);
        return {
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = item?.tabIcon || 'help';
            return (
              <Icon
                name={iconName as any}
                size={size}
                color={focused ? Colors.accent : color}
              />
            );
          },
          tabBarLabel: item?.tabLabel || route.name,
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
      {schema.navigation.items.map((item) => (
        <Tab.Screen key={item.screenId} name={item.name}>
          {() => <DynamicScreen screen={schemaScreens[item.screenId]} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}

export function DynamicNavigator({ schema, loading, error }: DynamicNavigatorProps) {
  const { Colors } = useAppTheme();

  const schemaScreens = useMemo(() => {
    const map: Record<string, AppSchemaScreen> = {};
    for (const s of schema.screens) map[s.id] = s;
    return map;
  }, [schema.screens]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : error ? (
          <Stack.Screen
            name="Error"
            children={() => <ErrorScreen errorMsg={error} />}
          />
        ) : (
          <Stack.Screen name="MainTabs">
            {() => <TabNavigator schema={schema} schemaScreens={schemaScreens} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
