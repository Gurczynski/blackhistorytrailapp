type LogLevel = 'info' | 'warn' | 'error';

interface LogMeta {
  [key: string]: unknown;
}

const logger = {
  info: (message: string, meta?: LogMeta) => {
    if (__DEV__) {
      console.log(`[INFO]`, message, meta);
    }
    // In production: send to Sentry, Datadog, etc.
  },

  warn: (message: string, meta?: LogMeta) => {
    if (__DEV__) {
      console.warn(`[WARN]`, message, meta);
    }
  },

  error: (error: Error, context?: string) => {
    if (__DEV__) {
      console.error(`[ERROR]`, context || '', error);
    }
    // In production: Send to error tracking service
    // Example: Sentry.captureException(error, { tags: { context } });
  },

  metric: (name: string, value: number, tags?: Record<string, string>) => {
    if (__DEV__) {
      console.log(`[METRIC]`, name, value, tags);
    }
    // In production: Send to analytics service
  },
};

export default logger;
