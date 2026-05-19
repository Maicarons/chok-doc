# Go Server Guide

The CHOKAPP server is a lightweight Go HTTP server with SQLite storage.

## Architecture

```
Request -> Middleware (CORS/Auth) -> Handler -> Logic -> Store (SQLite)
                                         ↓
                                   JSON Response
```

## Key Components

### Config (`internal/config`)

JSON-based configuration with sensible defaults:

```json
{
  "port": "8888",
  "db": {
    "driver": "sqlite",
    "dsn": "../chok-data/chokapp.db"
  },
  "cdn": {
    "main_json_url": "https://cdn.example.com/main.json"
  },
  "github": {
    "token": "",
    "owner": "chokapp",
    "repo": "chokapp",
    "branch": "main",
    "data_path": "chok-data/apps"
  },
  "auth": {
    "jwt_secret": "",
    "github_client_id": "",
    "github_client_secret": ""
  }
}
```

### Auth (`internal/middleware/auth.go`)

JWT-based authentication middleware:
- `AuthMiddleware()` — requires any authenticated user
- `AuthMiddleware("admin", "reviewer")` — requires specific roles
- GitHub OAuth integration for login

### Store (`internal/model/store.go`)

SQLite database with tables:
- `users` — GitHub-authenticated users with roles (admin, reviewer, user)
- `submissions` — app data submission queue (new, edit, delete)
- `app_stats` — view counts, download counts, recommendations
- `issue_reports` — user and CI reported issues
- `collections` — curated app collections
- `ranking_history` — historical ranking data
- `download_logs` — download event tracking

### Handler

HTTP request handling split across multiple files:
- `handler.go` — App, stats, issues, collections endpoints
- `auth_handler.go` — GitHub OAuth login, user info
- `user_handler.go` — User management (admin only)
- `submission_handler.go` — Submission CRUD and approval workflow

All responses use a standard JSON format:

```json
{
  "code": 0,
  "message": "ok",
  "data": { ... }
}
```

### GitHub Client (`internal/github/client.go`)

GitHub API integration for committing app data files:
- `CreateOrUpdateFile()` — Creates/updates `apps/{uid}/{lang}.json`
- `DeleteFile()` — Removes files on delete approval

### Logic (`internal/logic/app_logic.go`)

Business logic for loading app data from `main.json` and enriching it with dynamic statistics from the database.

## Running

```bash
cd chok-server
go run main.go
# Server starts on :8888
```

## Adding New Endpoints

1. Add handler method in appropriate handler file
2. Register route in `main.go` with optional auth middleware
3. Add business logic in `logic/` if needed
4. Add database operations in `model/store.go`
