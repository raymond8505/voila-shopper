# Tooling
**package manager**: always use `yarn` for all package management and script running

# Test Writing
**framework**: vitest with mock service worker
- if a test is failing because the component is throwing an error, never supress the error as a solution. Always prompt me to investigate
- **only** ever edit the given test file when writing tests. If a test is failing because of an issue in the component or project, prompt me to investigate

# Story Writing for Storybook
- any UI component of sufficient complexity should have stories for all of its states.

# Data Layer

## Data Fetching
- Use `@tanstack/react-query` for data fetching and caching
- `useQueryClient` for cache access and `fetchQuery` for cached requests

## Database Access
- Use `supabaseRequest` from `@src/api/supabase.ts` for direct database queries
- Uses Supabase REST API with table name and query params
- Example: `supabaseRequest({ table: 'products', tableParams: { id: 'eq.123' } })`

## Workflow API
- Use `useWorkflow` hook for n8n workflow calls (authenticated POST requests)
- Workflow URLs are configured via `VITE_WORKFLOW_*` env vars
- Auth uses basic auth from `VITE_WORKFLOW_USERNAME` / `VITE_WORKFLOW_PWD`

## Voila API
- `voilaRequest` in `@src/api/voila.ts` wraps Voila's internal API
- Must run from voila.ca domain (uses credentials: include)
- `fetchProducts(ids)` - get products by ID array
- `fetchPromotionPage()` - paginated promotion products
- `addToCart()` / `fetchCartProducts()` for cart operations

## Store (Zustand)
- Products store: `@store/products` - holds `StoreProduct[]` (raw + full data)
- Client store: `@store/client` - UI state, workflow live mode toggle
- Stores persist some data to localStorage via `helpers.ts`

# Types
- All types namespaced under `@src/types/*`
- `Product.StoreProduct` = { raw: RawProduct, full?: WithPriceIntelligence }
- `Product.WithPriceIntelligence` has `id`, `price_intelligence`, etc.
- `Voila.*` types for Voila API responses

# Path Aliases
- `@src/*` → `extension/client/src/*`
- `@store/*` → `extension/client/src/store/*`

# UI
- Use Ant Design components (`antd`)
- Emotion for styled components
- Dashboard uses react-router-dom for routing