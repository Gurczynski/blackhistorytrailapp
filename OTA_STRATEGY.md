# OTA Update Strategy

## Overview
Separate responsibilities between schema updates and code updates.

## Schema Updates (Supabase Sync)
- **Mechanism**: Schema stored in `app_schemas` table
- **Trigger**: Admin publishes schema → stored in Supabase
- **Mobile App**: Background sync via `NetInfo` + `AsyncStorage`
- **No app store update required**

## Code Updates (EAS Update)
- **New block types**: Requires app update
- **Bug fixes**: Via EAS Update (OTA)
- **Native changes**: Requires app store submission

## Workflow
1. **Content/Layout Changes**: Admin updates schema → Mobile app syncs automatically
2. **New Block Types**: Add to `blockRegistry.ts` → Push to GitHub → EAS Build/Update
3. **Critical Bug Fixes**: EAS Update for immediate OTA fix

## Safety Rules
- Mobile app does NOT execute remote code
- Only schema (JSON) drives UI
- All rendering uses predefined components
