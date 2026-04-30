import { useState, useEffect, useCallback, useRef } from 'react';
import type { AppSchema } from '../types/app-schema';
import { storage, syncSchema, startBackgroundSync } from '../core/sync';

export function useAppSchema(projectId: string, isDraft = false) {
  const [schema, setSchema] = useState<AppSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const loadSchema = useCallback(async () => {
    try {
      setLoading(true);
      const localSchema = await storage.getSchema();
      if (localSchema) setSchema(localSchema);

      const remoteSchema = await syncSchema(projectId, isDraft);
      if (remoteSchema) {
        setSchema(remoteSchema);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load schema');
    } finally {
      setLoading(false);
    }
  }, [projectId, isDraft]);

  useEffect(() => {
    loadSchema();
  }, [loadSchema]);

  useEffect(() => {
    if (!projectId) return;

    const unsubscribe = startBackgroundSync(projectId, (newSchema) => {
      setSchema(newSchema);
    });
    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [projectId]);

  return { schema, loading, error, reload: loadSchema };
}
