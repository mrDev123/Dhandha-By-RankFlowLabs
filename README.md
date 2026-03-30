# Dhandha-By-RankFlowLabs

Initial project structure for a mobile-first business photo quality web app.

## Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Storage:** Firebase Storage or AWS S3 (adapter-ready)

## Folder Structure

```text
.
├── frontend/
│   ├── src/components/      # Camera capture, overlay, and report components
│   ├── src/hooks/           # Camera and upload hooks
│   ├── src/pages/           # Page-level UI composition
│   ├── src/services/        # Backend API integration
│   └── src/utils/           # Shared constants/helpers
├── backend/
│   └── src/
│       ├── controllers/     # Request handlers
│       ├── middleware/      # Multer upload middleware
│       ├── routes/          # API routes
│       ├── services/        # Image analysis service
│       ├── storage/         # Firebase/S3 upload adapters
│       ├── db/              # Persistence layer (placeholder)
│       ├── models/          # Model typedefs
│       └── utils/           # Utilities (async handler)
└── docs/
    └── PROJECT_STRUCTURE.md
```

## Initial Files Included

- Frontend camera capture + overlay + quality report components
- Frontend upload API client and starter hooks (`useCamera`, `usePhotoUpload`)
- Backend analyze route wired through controller + middleware
- Placeholder image analysis, storage adapters, and DB persistence

## Start

```bash
npm install
npm run dev
```
