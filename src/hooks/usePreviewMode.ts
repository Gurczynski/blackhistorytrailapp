import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import type { AppSchema } from '../types/app-schema';
import { storage, syncSchema } from '../core/sync';

export function usePreviewMode(projectId: string) {
  const [isPreview, setIsPreview] = useState(false);
  const [previewSchema, setPreviewSchema] = useState<AppSchema | null>(null);

  useEffect(() => {
    const checkPreview = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const params = new URLSearchParams(url.split('?')[1]);
        if (params.get('preview') === 'true' || params.get('draft') === 'true') {
          setIsPreview(true);
          const schema = await syncSchema(projectId, true);
          if (schema) setPreviewSchema(schema);
        }
      }
    };
    checkPreview();

    const listener = Linking.addEventListener('url', (event: any) => {
      const params = new URLSearchParams(event.url.split('?')[1]);
      if (params.get('preview') === 'true' || params.get('draft') === 'true') {
        setIsPreview(true);
        syncSchema(projectId, true).then(s => {
          if (s) setPreviewSchema(s);
        });
      }
    });

    return () => listener.remove();
  }, [projectId]);

  return { isPreview, previewSchema };
}
