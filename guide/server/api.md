# API Reference

Base URL: `http://localhost:8888`

## Authentication

### GitHub Login
```
POST /api/auth/github
Content-Type: application/json

{ "code": "<github_oauth_code>" }
```
Exchanges GitHub OAuth code for a JWT token. Creates user if first login. Returns `{ token, user }`.

### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```
Returns the authenticated user's info.

## Users (Admin only)

All user endpoints require `Authorization: Bearer <token>` with admin role.

### List Users
```
GET /api/users
```

### Update User Role
```
PUT /api/users/{id}
Content-Type: application/json

{ "role": "admin | reviewer | user" }
```

## Submissions

All submission endpoints require authentication.

### Create Submission
```
POST /api/submissions
Authorization: Bearer <token>
Content-Type: application/json

{
  "uid": "1005",
  "type": "new",
  "data": [
    {
      "uid": "1005",
      "name": "My App",
      "summary": "A great app",
      "description": "Full description...",
      "logo": "https://example.com/logo.png",
      "categories": ["tools"],
      "downloads": { "windows": ["https://..."] },
      "tags": ["open-source"]
    }
  ]
}
```
Types: `new`, `edit`, `delete`. For `delete` type, `data` is not required.

### List Submissions (reviewer+)
```
GET /api/submissions?type=new&status=pending&limit=50&offset=0
Authorization: Bearer <token>
```

### Get Submission Detail (reviewer+)
```
GET /api/submissions/{id}
Authorization: Bearer <token>
```

### Approve Submission (reviewer+)
```
POST /api/submissions/{id}/approve
Authorization: Bearer <token>
Content-Type: application/json

{ "review_note": "Looks good" }
```
On approval, the backend commits data files to the GitHub repository.

### Reject Submission (reviewer+)
```
POST /api/submissions/{id}/reject
Authorization: Bearer <token>
Content-Type: application/json

{ "review_note": "Missing required fields" }
```

## Apps

### Get Hot Apps
```
GET /api/apps/hot?limit=20
```
Returns apps sorted by download count.

### Get Latest Apps
```
GET /api/apps/latest?limit=20
```
Returns apps sorted by creation date.

### Get App Detail
```
GET /api/apps/{uid}
```
Returns full app info with dynamic stats.

### Search Apps
```
GET /api/apps/search?q=keyword
```
Case-insensitive search across app names in all languages.

### Get Rankings
```
GET /api/apps/ranking?type=all_time&page=1&size=20
```
Types: `weekly`, `monthly`, `all_time`

## Downloads

### Record Download
```
POST /api/apps/download
Content-Type: application/json

{ "uid": "com.example.app", "platform": "windows" }
```
Rate limited: 5 per IP per minute.

### Record View
```
POST /api/apps/view
Content-Type: application/json

{ "uid": "com.example.app" }
```
Rate limited: 1 per IP per hour per app.

## Issues

### Report Issue
```
POST /api/apps/report
Content-Type: application/json

{
  "app_uid": "com.example.app",
  "title": "Download link broken",
  "description": "The Windows download link returns 404"
}
```

### Get Issues
```
GET /api/issues?app_uid=com.example.app&status=pending&limit=50&offset=0
```

### Update Issue Status (reviewer+)
```
POST /api/issues/manage/{id}
Authorization: Bearer <token>
Content-Type: application/json

{ "status": "verified | resolved" }
```

### CI Issue Batch
```
POST /api/ci/issues
Content-Type: application/json

{
  "issues": [
    {
      "uid": "com.example.app",
      "platform": "windows",
      "link": "https://...",
      "status_code": 404,
      "checked_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## Collections

### List Collections
```
GET /api/collections
```

### Create Collection
```
POST /api/collections
Content-Type: application/json

{
  "name": "Open Source Tools",
  "description": "Best open source tools",
  "app_uids": ["com.example.app"],
  "sort_order": 0
}
```

## Stats

### Get Stats
```
GET /api/stats
```
Returns `{ total_apps, total_views, total_downloads, stats }`.

## Sync

### Sync Data
```
POST /api/sync
```
Reloads app data from `main.json`.
