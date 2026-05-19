# Project Structure

```
chokapp/
├── client/                    # Flutter client
│   ├── lib/
│   │   ├── main.dart          # App entry point
│   │   └── app/
│   │       ├── controllers/   # GetX controllers
│   │       ├── models/        # Data models
│   │       ├── modules/       # Feature modules
│   │       ├── routes/        # Route config
│   │       ├── services/      # API & locale services
│   │       ├── theme/         # Theme configuration
│   │       ├── utils/         # Responsive utilities
│   │       └── widgets/       # Shared widgets
│   └── pubspec.yaml
├── server/                    # Go server
│   ├── main.go
│   ├── go.mod
│   └── internal/
│       ├── config/            # Configuration
│       ├── handler/           # HTTP handlers
│       ├── logic/             # Business logic
│       └── model/             # Data models & store
├── admin/                     # Vue 3 admin panel
│   ├── src/
│   │   ├── api/               # API layer
│   │   ├── components/        # Shared components
│   │   ├── layouts/           # Page layouts
│   │   ├── router/            # Vue Router
│   │   ├── stores/            # Pinia stores
│   │   └── views/             # Page views
│   └── package.json
├── data/                      # App data repository
│   ├── apps/                  # Individual app JSONs
│   │   └── {uid}.json
│   ├── main.json              # Merged app data
│   ├── schema.json            # JSON Schema
│   └── scripts/               # Python CI scripts
│       ├── merge_to_main.py
│       └── link_checker.py
└── doc/                       # VitePress documentation
    ├── .vitepress/
    │   └── config.mts
    ├── index.md
    └── guide/
```
