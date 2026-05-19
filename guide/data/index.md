# App Data Format

App data is stored as per-language JSON files organized by UID directories.

## Directory Structure

```
apps/
  1001/
    en.json      -- English (primary source with all fields)
    zh-CN.json   -- Simplified Chinese (localized fields)
    zh-TW.json   -- Traditional Chinese (localized fields)
    ja.json      -- Japanese (localized fields)
  1002/
    en.json
    zh-CN.json
    ...
```

## Primary Language File (`apps/{uid}/en.json`)

The English file serves as the primary source and contains all shared fields:

```json
{
  "uid": "1001",
  "name": "VNote",
  "summary": "A pleasant note-taking platform with Markdown support",
  "description": "# VNote\n\nFull Markdown description...",
  "logo": "https://example.com/logo.png",
  "website": "https://example.com",
  "license": "MIT",
  "categories": ["productivity", "tools"],
  "downloads": {
    "android": ["https://play.google.com/..."],
    "windows": ["https://github.com/.../releases/latest"],
    "macos": ["https://github.com/.../releases/latest"],
    "linux": ["https://flathub.org/..."]
  },
  "tags": ["open-source", "cross-platform"],
  "screenshots": ["https://cdn.example.com/1.png"],
  "created_at": "2024-01-15T00:00:00Z",
  "updated_at": "2024-06-01T00:00:00Z"
}
```

## Translation Files (`apps/{uid}/{lang}.json`)

Other language files only contain localized fields:

```json
{
  "uid": "1001",
  "name": "VNote 笔记",
  "summary": "一款舒适的 Markdown 笔记平台",
  "description": "# VNote\n\n完整描述..."
}
```

## Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `uid` | Yes | Unique numeric app identifier |
| `name` | Yes (en) | App name in this language |
| `summary` | Yes (en) | Short description in this language |
| `description` | No | Full Markdown description in this language |
| `logo` | Yes | URL to app logo image |
| `website` | No | Official website URL |
| `license` | No | License identifier (MIT, GPL-3.0, etc.) |
| `categories` | Yes | Array of category strings |
| `downloads` | Yes | Per-platform array of download URLs |
| `tags` | No | Array of tag strings |
| `screenshots` | No | Array of screenshot image URLs |
| `created_at` / `updated_at` | No | ISO 8601 timestamps |

## main.json

The merge script (`merge_to_main.py`) combines all per-language files into a single `main.json`:

```json
{
  "uid": "1001",
  "names": { "en": "VNote", "zh-CN": "VNote 笔记", ... },
  "summaries": { "en": "...", "zh-CN": "...", ... },
  "descriptions": { "en": "# VNote...", "zh-CN": "# VNote..." },
  "logo": "...",
  "categories": [...],
  "downloads": {...}
}
```

This is the format served to clients and the server API.

## Submission Workflow

1. **User submits** app data through the admin panel (`Submit App` page)
2. **Reviewer approves** via the `Review Submissions` page
3. **Backend commits** per-language JSON files to `chok-data/apps/{uid}/` on GitHub
4. **GitHub Action** (hourly) runs `merge_to_main.py` to regenerate `main.json`
5. **Crowdin** watches `apps/*/en.json` for translation updates
