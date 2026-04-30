import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppSchema } from '../types/app-schema';

const SCHEMA_KEY = 'app_schema';

export const storage = {
  async getSchema(): Promise<AppSchema | null> {
    try {
      const schemaStr = await AsyncStorage.getItem(SCHEMA_KEY);
      return schemaStr ? JSON.parse(schemaStr) : null;
    } catch {
      return null;
    }
  },

  async saveSchema(schema: AppSchema): Promise<void> {
    await AsyncStorage.setItem(SCHEMA_KEY, JSON.stringify(schema));
  },
};