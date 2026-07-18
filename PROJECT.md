# PROJECT.md — Tide AI

## What This Is
Tide AI is a free, on-demand study helper for VCE Year 12 students, starting with Chemistry. It's powered (eventually) by a RAG-trained model grounded in the VCE curriculum, so students get accurate, syllabus-aligned answers instead of generic chatbot output. The pitch is speed and reliability: a student is stuck on a question, they get an answer fast, with minimal friction.

## Current Phase
**UI and scaffolding only.** No real AI/RAG logic yet — see `AGENTS.md` Scope section. This phase exists to nail the product experience (homepage + chat interface) with mocked data, so the AI layer can be dropped in later without reworking the frontend.

## Design Direction
Reference point: **Claude.ai's chat interface** — tight,academic, minimalist, structured, no visual noise.

- **Bezels:** rounded, soft, consistent radius across cards/inputs/buttons.
- **Buttons:** blend into background at rest, become visible on hover/focus. Nothing shouts by default.
- **Chat layout:** clear separation between sidebar (chat history/navigation) and the active conversation. Sidebar is a persistent "train" of past chats.
- **Priority:** answering the question fast. Every element either supports that or gets cut.
- **Homepage:** more detailed than the chat page but still minimalist 

### Color System
- **Neutrals (white/grey):** dominant, used for empty space, backgrounds, body content.
  Light mode = white/near-white surfaces. Dark mode = grey/near-black surfaces.
- **Deep ocean blue:** the one accent color. Used on the sidebar and interactive
  accents (active states, primary buttons, links, focus rings). Not used for large
  background fields — it's a highlight, not a base.
- No secondary accent colors unless explicitly added later. Two-tone palette is
  intentional — don't introduce green/red/yellow states without asking, even for
  things like errors — prefer neutral/blue-tinted treatments first.

### Typography & Feel
- Mainly: an academic serif font like Times New Roman or GFS Didot. Bolder font to be used for logos.
- Generous whitespace over dense information; VCE students should feel like the tool respects their time and attention.

## Pages In Scope Right Now
1. **Homepage** — introduces Tide AI, explains the value prop (free, on-demand,
   VCE-aligned, starting with Chemistry), routes into the chat experience. Detailed
   design to follow via image reference.
2. **Chat interface** — Claude-style layout: sidebar with chat history, main thread
   view, message input. Backed by mocked/static responses for now.

## Roadmap (Not Current Scope)
- **Phase 2:** Real RAG pipeline — VCE Chemistry curriculum ingestion, embeddings,retrieval, model inference wired into `lib/ai/` and `app/api/chat/route.ts`.
- Model selection - different power models themed around fish - ranging from the lowest effort Sardine model to the maximum effort Kraken model. 
- **Phase 3:** Expand beyond Chemistry to other VCE subjects.
- **Later:** Usage analytics, student accounts/history persistence beyond auth,
  possible feedback/rating loop on answer quality.