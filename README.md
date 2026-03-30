# Dhandha-By-RankFlowLabs

Mobile-first business photo quality app scaffold with strict separation of concerns.

## Architecture (see `ARCHITECTURE.md`)

- **Frontend (`frontend`)**: UI only (camera, overlays, report rendering, API calls)
- **Backend (`backend`)**: API + orchestration/business logic (upload, storage, persistence, analysis orchestration)
- **AI Module (`ai-analysis`)**: isolated image-quality analysis logic (brightness, blur, framing + suggestions)

## Monorepo Structure

```text
.
├── ARCHITECTURE.md
├── frontend/
├── backend/
├── ai-analysis/
└── docs/
```

## Start

```bash
npm install
npm run dev
```
