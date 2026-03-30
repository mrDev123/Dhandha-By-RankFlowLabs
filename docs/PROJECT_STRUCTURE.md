# Project Structure (Initial)

## Monorepo Layout

```text
.
├── frontend/
│   ├── src/
│   │   ├── components/      # Camera UI, overlays, and result widgets
│   │   ├── hooks/           # Reusable camera/upload hooks
│   │   ├── pages/           # Page-level containers
│   │   ├── services/        # API communication layer
│   │   └── utils/           # Frontend helpers/constants
├── backend/
│   ├── src/
│   │   ├── config/          # Environment and provider selection
│   │   ├── controllers/     # Route handlers
│   │   ├── db/              # Persistence implementations
│   │   ├── middleware/      # Upload/multipart middleware
│   │   ├── models/          # Data shape definitions
│   │   ├── routes/          # Express routes
│   │   ├── services/        # Image analysis logic
│   │   ├── storage/         # Firebase/S3 adapters
│   │   └── utils/           # Error helpers and shared utilities
└── docs/                    # Architecture and setup docs
```
