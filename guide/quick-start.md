# Quick Start

This guide helps you set up all components of CHOKAPP for local development.

## Prerequisites

- **Flutter** 3.x+ (for client)
- **Go** 1.20+ (for server)
- **Node.js** 20+ with pnpm (for admin and docs)
- **Python** 3.10+ (for CI scripts)

## 1. Clone the Repository

```bash
git clone https://github.com/maicarons/chokapp.git
cd chokapp
```

## 2. Server Setup

```bash
cd server
go mod download
go run main.go
```

The server starts on `http://localhost:8888`.

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/apps/hot | Hot apps |
| GET | /api/apps/latest | Latest apps |
| GET | /api/apps/ranking | Rankings |
| GET | /api/apps/:uid | App detail |
| GET | /api/apps/search?q= | Search |
| POST | /api/apps/download | Record download |
| POST | /api/apps/report | Report issue |
| GET | /api/collections | Collections |
| GET | /health | Health check |

## 3. Client Setup

```bash
cd client
flutter pub get
flutter run -d chrome  # For web
```

Or for desktop:
```bash
flutter run -d windows
flutter run -d macos
flutter run -d linux
```

## 4. Admin Setup

```bash
cd admin
pnpm install
pnpm dev
```

The admin panel starts on `http://localhost:5173`.

## 5. Documentation

```bash
cd doc
pnpm install
pnpm docs:dev
```

Docs start on `http://localhost:5173`.

## 6. Data Management

To merge app data:
```bash
cd data
python scripts/merge_to_main.py
```

To check links:
```bash
CHOKAPP_API_URL=http://localhost:8888 python scripts/link_checker.py
```
