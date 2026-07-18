<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md — Tide AI

Instructions for any AI agent (Codex, etc.) working in this repository.

## Project Type
Next.js 14+ web app, App Router, TypeScript-first. Full-stack: React frontend, Node backend via Route Handlers, Supabase for auth + data, deployed on Vercel.

## Tech Stack
- **Framework:** Next.js (App Router, RSC by default, `"use client"` only where needed)
- **Language:** TypeScript, strict mode. No `any` unless justified with a comment.
- **UI:** Tailwind CSS + shadcn/ui primitives. No CSS-in-JS, no separate design system library.
- **State:** React state/context only. No Redux/Zustand/Jotai — this app does not need them yet.
- **Backend:** Next.js Route Handlers (`app/api/**/route.ts`). No separate Express server.
- **Auth + DB:** Supabase (`@supabase/ssr`). Split clients: `lib/supabase/client.ts` (browser),
  `lib/supabase/server.ts` (server components/actions), middleware for session refresh.
- **Deployment:** Vercel. Assume edge-safe code where practical, but don't force it.
- **Package manager:** npm unless told otherwise.

## Coding Conventions
- Prefer simple, direct solutions over abstraction. Don't build generic systems for one use case.
- No premature optimization, no speculative config, no unused providers/wrappers.
- Colocate: a feature's components, hooks, and types live near where they're used, not
  scattered into deep shared folders unless genuinely reused 2+ places.
- Server Components by default; only mark `"use client"` for interactivity (chat input,
  theme toggle, etc.).
- Route Handlers stay thin — validate input, call a `lib/` function, return response.
  No business logic inline in `route.ts`.
- Functional components only. No class components.
- Naming: `PascalCase` components, `camelCase` functions/vars, `kebab-case` filenames
  except component files which match their component name.
- Comments explain *why*, not *what*. Skip comments on self-evident code.
- Keep diffs minimal — don't reformat or refactor unrelated code while making a change.

## Styling
- Tailwind utility classes directly in JSX; extract to a component when reused 2+ times.
- Theme colors defined as CSS variables in `globals.css`, referenced via Tailwind config
  (`bg-background`, `bg-accent`, etc.) — never hardcode hex values in components.
- Palette: white/grey neutrals (light & dark mode) for surfaces, deep ocean blue as the
  single accent color (sidebars, active states, primary actions). See `PROJECT.md` for
  design intent.
- Dark mode via `next-themes` or Tailwind's `class` strategy — pick one, be consistent.

## Current Scope — Read Before Implementing
This phase is **UI and structural scaffolding only**. Specifically:
- ✅ Build: homepage, chat interface UI (layout, sidebar, message list, input, chat history),
  navigation, theming, responsive layout, Supabase auth UI/flow.
- ✅ Scaffold: `lib/ai/` and `app/api/chat/route.ts` as typed stubs with clear `TODO` markers
  and mock/static responses — enough to demonstrate the UI working end-to-end.
- ❌ Do NOT implement real RAG retrieval, model inference, embeddings, or vector DB logic.
  Any AI response in this phase should be a hardcoded/mocked placeholder clearly marked
  as such. Do not reach for AI SDKs, vector stores, or inference providers unless asked.
- If a task seems to require real AI logic to "finish properly," stop and use a mock instead —
  don't silently expand scope.

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (must pass before considering a task done)
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type check

## Before Finishing a Task
1. `npm run build` and `npx tsc --noEmit` both pass.
2. No new dependencies added without a clear, stated reason.
3. No AI/RAG logic implemented beyond mocked placeholders (see Scope).
4. New UI matches the palette/theme rules in `PROJECT.md` — don't invent new colors.