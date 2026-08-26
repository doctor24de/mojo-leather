# Mojo Leather

Bulgarian headless commerce monorepo for women's and men's leather jackets.

## Applications

- `storefront/` — customer-facing Bulgarian storefront
- `backend/` — Medusa v2 API, Admin, and worker

Each application has its own lockfile and production Dockerfile so Coolify can deploy it independently from this repository.

## Coolify resources

1. PostgreSQL (private)
2. Redis (private)
3. Storefront application with base directory `/storefront`, port `3000`
4. Medusa server with base directory `/backend`, port `9000`
5. Medusa worker with base directory `/backend`, no public domain

Never commit real secrets or internal database URLs. Add them in Coolify's Environment Variables panel.
