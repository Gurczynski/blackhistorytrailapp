import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useAppTheme } from './providers/ThemeProvider';
import { useAppConfig } from './hooks/useAppConfig';
import { useAppSchema } from './hooks/useAppSchema';
import { usePreviewMode } from './hooks/usePreviewMode';
import { DynamicNavigator } from './navigation/DynamicNavigator';

const App: React.FC = () => {
  const config = useAppConfig();
  const projectId = config.project?.id || '';
  const { schema, loading, error } = useAppSchema(projectId);
  const { isPreview, previewSchema } = usePreviewMode(projectId);
  const { Colors } = useAppTheme();

  const activeSchema = isPreview && previewSchema ? previewSchema : schema;

  return (
    <ThemeProvider theme={config.theme}>
      <StatusBar style="light" backgroundColor={config.theme?.colors?.primary || '#154777'} />
      {activeSchema ? (
        <DynamicNavigator
          schema={activeSchema}
          loading={loading}
          error={error}
        />
      ) : (
        <DynamicNavigator
          schema={{
            version: 1,
            updatedAt: new Date().toISOString(),
            navigation: { type: 'tabs', items: [] },
            screens: [],
          }}
          loading={false}
          error={!config.loading && !schema ? 'No schema found. Please configure the app in App Weaver admin.' : null}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
