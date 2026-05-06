# Prototype Agent Context

This project is a React prototype for recreating a legacy platform screen by screen from user-provided screenshots. The user is a product designer and wants the prototype to explain how platform screens, states, roles, and flows connect.

## Stack

- Vite + React + TypeScript.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- shadcn/ui components live in `src/components/ui`.
- Lucide icons are available through `lucide-react`.

## Screenshot Recreation Rules

- Treat each screenshot as the source of truth for UX, layout, hierarchy, information architecture, and interaction placement.
- Use shadcn/ui as the visual baseline. Do not copy the original platform branding unless the user explicitly asks for exact visual styling.
- Preserve screen structure closely: navigation, density, grouping, table columns, filters, cards, dialogs, side panels, empty states, and visible metadata.
- Ask for missing context only when it blocks the screen or flow. Otherwise make a clear, conservative assumption and document it.
- Keep recreated screens componentized and named by platform area so they can later be mapped to Figma frames.

## File Organization

- `src/App.tsx` is the current prototype shell.
- `src/prototype/platform-map.ts` stores starter workflow metadata and can grow into a screen/flow registry.
- Add future recreated screens under `src/screens/<screen-name>.tsx`.
- Add reusable non-shadcn prototype components under `src/components/prototype`.
- Keep shadcn source components in `src/components/ui` and modify them only when a design-system-level change is needed.

## Figma Readiness

- Use token-friendly Tailwind classes: `bg-background`, `bg-card`, `text-muted-foreground`, `border-border`, `rounded-*`, and spacing utilities.
- Name components, screens, and flow states in plain product language.
- Capture assumptions, open questions, and connections between screens in docs or in the screen registry.
- Prefer clear layout sections over deeply nested anonymous divs so screens can be rebuilt in Figma later.
