# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router entrypoints; domain folders (`events`, `leadership`, `admin`) hold pages and API handlers under `api`. `layout.tsx` owns root shell, `globals.css` sets tokens.
- `src/components`: Shared UI split by feature folders plus `layout` shell parts and `ui` primitives. Compose pages in `app`, keep reusable pieces here.
- `src/data`: Static content/config objects feeding pages.
- `src/lib`: Cross-cutting helpers (API helpers, formatting utilities); keep side-effect-free.
- `src/types`: Shared TypeScript contracts. Extend here before duplicating shapes.
- `public`: Static assets served at the site root.

## Build, Test, and Development Commands
- `npm install`: Install dependencies (Node 20+ recommended).
- `npm run dev`: Local dev server at `http://localhost:3000` with hot reload.
- `npm run lint`: ESLint with Next Core Web Vitals + TypeScript rules; required pre-PR.
- `npm run build`: Production build for client/server bundles.
- `npm run start`: Serve the last build for pre-deploy verification.

## Coding Style & Naming Conventions
- TypeScript + React functional components; keep components small and composable.
- 2-space indentation; default to single quotes. Let ESLint guide fixes.
- Components and files use `PascalCase`; hooks/utilities use `camelCase`. Prefer named exports unless a file has one clear default.
- Use Tailwind utility classes; `clsx` for conditional styling. Keep imports path-alias friendly (`@/components/...`).

## Testing Guidelines
- No automated suite yet; when adding, colocate tests next to components or under `src/__tests__` using `ComponentName.test.tsx`.
- Focus on rendering/interaction coverage for UI and deterministic outputs for helpers; mock network boundaries in `src/app/api` and `src/lib`.
- Run `npm run lint` with new tests to keep types and accessibility checks intact.

## Commit & Pull Request Guidelines
- Commit messages are imperative and concise (e.g., `Add events hero CTA`); keep logical scopes separate from refactors.
- PRs include a summary, affected routes/components, screenshots or GIFs for UI tweaks, and linked issues/tasks. Call out known gaps or follow-ups.
- Verify `npm run lint` (and tests when present) before requesting review; keep diffs focused to speed review.

## Security & Configuration Tips
- Put secrets in `.env.local`; never commit them. Access via `process.env` and guard uses in route handlers.
- Validate and sanitize user-supplied input in API routes under `src/app/api` before forwarding or persisting.
