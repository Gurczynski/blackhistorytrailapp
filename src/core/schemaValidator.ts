import { z } from 'zod';
import type { AppSchema, AppSchemaScreen, AppSchemaBlock, AppSchemaNavigation } from '../types/app-schema';

const NavItemSchema = z.object({
  name: z.string().min(1, 'Navigation item name is required'),
  screenId: z.string().uuid('Invalid screen ID format'),
  tabIcon: z.string().optional(),
  tabLabel: z.string().optional(),
});

const NavigationSchema = z.object({
  type: z.enum(['tabs', 'stack'], { errorMap: () => ({ message: 'Navigation type must be "tabs" or "stack"' }) },
  items: z.array(NavItemSchema).min(1, 'At least one navigation item is required'),
});

const BlockSchema = z.object({
  id: z.string().uuid('Invalid block ID format'),
  type: z.enum(['text', 'image', 'button', 'list', 'faq', 'map', 'event'], {
    errorMap: () => ({ message: 'Block type must be one of: text, image, button, list, faq, map, event' }),
  }),
  props: z.record(z.unknown()).default({}),
});

const ScreenSchema = z.object({
  id: z.string().uuid('Invalid screen ID format'),
  title: z.string().min(1, 'Screen title is required'),
  blocks: z.array(BlockSchema).default([]),
});

export const AppSchemaValidator = z.object({
  version: z.number().int().positive('Version must be a positive integer'),
  updatedAt: z.string().datetime({ message: 'updatedAt must be a valid ISO datetime string' }),
  navigation: NavigationSchema,
  screens: z.array(ScreenSchema).min(1, 'At least one screen is required'),
});

export interface ValidationError {
  path: string;
  message: string;
}

export function validateSchema(data: unknown): { success: true; data: AppSchema } | { success: false; errors: ValidationError[] } {
  const result = AppSchemaValidator.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors: ValidationError[] = result.error.errors.map(err => ({
    path: err.path.join('.'),
    message: err.message,
  }));
  return { success: false, errors };
}
