# LocalPilot dashboard

An interactive, fictional local-business growth workspace built with React, TypeScript, Vite, Tailwind CSS, genuine shadcn/ui components (Radix), Recharts and Lucide icons.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. `npm run build` creates `dist`; `npm test` runs four domain/fixture checks using Node's built-in test runner (Node 23+).

## Explore

Fourteen destinations cover overview analytics, content calendar, content studio, review inbox, geographic ranking grids, competitor research, business profile, social connections, website SEO, citations, autopilot controls, reports, usage/plans and settings.

Try creating a draft, scheduling content, generating a sample review response, approving the response, running a simulated ranking scan, preparing citation corrections, resolving an audit finding, pausing autopilot, changing a sample plan or exporting a CSV report. Search opens with Ctrl/Cmd+K. Layout adapts to phones with a navigation drawer and list-based calendar.

State is saved in this browser's localStorage. Use **Reset demo** in the sidebar to restore fixtures. Browser state does not sync across devices.

## Demo boundary

All businesses, reviews, rankings, traffic, competitor insights, pricing and history are fictional examples. AI generation uses local sample text. Connections, posting, review replies, audits, scans, billing and domain changes are simulations. There is no backend, authentication, payment collection or live Google/Meta integration. These require implementation and provider approval before production use. Nothing here verifies actual customer traction or ranking improvements.

## Structure

- `src/pages/Insights.tsx`: overview, rankings, competitors
- `src/pages/Content.tsx`: calendar, studio, editor, reviews
- `src/pages/Presence.tsx`: profile, integrations, website SEO, citations
- `src/pages/Manage.tsx`: autopilot, reports, billing, settings
- `src/components/ui`: generated shadcn/ui primitives
- `src/context.tsx`: navigation, browser state and shared actions
- `src/lib/demo.ts`: fixtures and domain helpers
- `qa-flow.js`: browser workflow checks through Playwright CLI

No secrets or external service credentials are required. The separate nested Git repository keeps this prototype isolated from the parent project.
