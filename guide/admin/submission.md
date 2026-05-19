# App Data Submission & Review Workflow

## Overview

App static data submission follows a review-then-commit workflow. Users submit data through the admin panel, reviewers approve or reject, and approved data is automatically committed to the GitHub repository.

## Workflow

```
User                    Reviewer                 Backend                  GitHub
  |                         |                       |                        |
  |-- Submit app data ----->|                       |                        |
  |   POST /api/submissions |                       |                        |
  |                         |                       |-- Store in DB (pending) |
  |                         |<-- List submissions --|                        |
  |                         |   GET /api/submissions|                        |
  |                         |                       |                        |
  |                         |-- View detail ------->|                        |
  |                         |<-- Submission data ---|                        |
  |                         |                       |                        |
  |                         |-- Approve ----------->|                        |
  |                         |   POST .../approve    |-- Commit files ------->|
  |                         |                       |   apps/1005/en.json    |
  |                         |                       |   apps/1005/zh-CN.json  |
  |                         |                       |<-- Success ------------|
  |                         |<-- Approved ----------|                        |
  |                         |                       |                        |
  |                         |                       |-- GitHub Action ------->|
  |                         |                       |   (hourly merge)        |
  |                         |                       |<-- main.json updated ---|
```

## Submission Types

| Type | Description | Data Required |
|------|-------------|---------------|
| `new` | Submit a new app | Full app data (per-language) |
| `edit` | Edit existing app data | Updated fields |
| `delete` | Request app removal | UID only |

## API Endpoints

### Create Submission (User+)
```
POST /api/submissions
Authorization: Bearer <token>

{
  "uid": "1005",
  "type": "new",
  "data": [
    {
      "uid": "1005",
      "name": "App Name",
      "summary": "Short description",
      "description": "Full Markdown description",
      "logo": "https://cdn.example.com/logo.png",
      "website": "https://example.com",
      "license": "MIT",
      "categories": ["tools"],
      "downloads": {
        "windows": ["https://github.com/.../releases/latest"]
      },
      "tags": ["open-source"],
      "screenshots": ["https://cdn.example.com/1.png"]
    }
  ]
}
```

### List Submissions (Reviewer+)
```
GET /api/submissions?type=new&status=pending&limit=50
Authorization: Bearer <token>
```

### Approve (Reviewer+)
```
POST /api/submissions/{id}/approve
Authorization: Bearer <token>
{ "review_note": "All fields validated" }
```

### Reject (Reviewer+)
```
POST /api/submissions/{id}/reject
Authorization: Bearer <token>
{ "review_note": "Missing English description" }
```

## Data Commit Format

On approval, per-language JSON files are committed to the GitHub repository:

```
chok-data/apps/
  1005/
    en.json      -- English (primary, all shared fields)
    zh-CN.json   -- Simplified Chinese (localized only)
    zh-TW.json   -- Traditional Chinese (localized only)
    ja.json      -- Japanese (localized only)
```

### English File (`en.json`)
Contains all shared fields (logo, categories, downloads, etc.) plus English localized text.

### Translation Files (`zh-CN.json`, etc.)
Contain only `uid`, `name`, `summary`, `description` — localized text fields.

## Delete Flow

Delete requests follow the same review workflow:

1. User submits delete request via admin panel
2. Request appears in review queue as type `delete`
3. Reviewer approves → backend removes all `apps/{uid}/*.json` files from GitHub
4. Next hourly merge regenerates `main.json` without the deleted app

## Crowdin Integration

Crowdin watches `apps/*/en.json` files for changes:

- **Source**: `apps/*/en.json` (English)
- **Translations**: `apps/{uid}/{locale}.json`
- New translations are submitted as `edit` type submissions for review
