// Shared layer - reusable across all layers
// This layer cannot import from any other layer (entities, features, widgets, pages, app)

// Note: Import UI components directly from @/shared/ui/[component]
// Note: Import hooks directly from @/shared/hooks/[hook]
// Note: Import config directly from @/shared/config/[config]
// Note: Import types directly from @/shared/types/[type]
// Note: Import lib utilities directly from @/shared/lib/[util]

// Common utility
export { cn } from './lib/utils';
