# WearBefore Stack Map

## Core App
- Frontend framework: Next.js (App Router)
- UI library: React + TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- State management: Zustand

## Authentication
- Auth provider: Auth0
- SDK: @auth0/nextjs-auth0
- Auth routes: /auth/login, /auth/logout, /auth/callback, /auth/profile (middleware)

## Database
- Database platform: Neon (PostgreSQL)
- Driver: @neondatabase/serverless
- Schema definitions: db/schema.sql
- Runtime schema bootstrap: lib/database-schema.ts

## Catalog / Products
- Product source of truth: Neon products table
- Catalog fallback seed data: data/products.ts + data/newArrivals.ts
- Catalog data access layer: lib/catalog.ts
- Product APIs:
  - GET /api/products
  - GET /api/products/[id]

## Cart
- Client cart state: Zustand (store/cartStore.ts)
- Server persistence (authenticated users): Neon carts + cart_items
- Cart API: /api/cart

## Orders
- Order persistence: Neon orders + order_items
- Orders API: /api/orders
- Checkout integration: app/checkout/page.tsx posts to /api/orders
- Account order history: app/account/orders/page.tsx reads /api/orders

## AI Trial
- Model provider: Google Gemini API
- Server route: app/api/ai-trial/route.ts
- AI trial UI: app/ai-trial/page.tsx
- Product-aware AI context: built from full catalog list with product URLs
