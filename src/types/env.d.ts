declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_SUPABASE_URL?: string;
    EXPO_PUBLIC_SUPABASE_ANON_KEY?: string;
    EXPO_PUBLIC_APP_NAME?: string;
    EXPO_PUBLIC_GIS_BASE_URL?: string;
    EXPO_PUBLIC_GIS_TOKEN?: string;
    EXPO_PUBLIC_OPENAI_MODEL?: string;
    EXPO_PUBLIC_OPENAI_API_KEY?: string;
    EXPO_PUBLIC_IOS_GOOGLE_MAPS_API_KEY?: string;
    EXPO_PUBLIC_ANDROID_GOOGLE_MAPS_API_KEY?: string;
  }
}

