# CI Scripts

## Data Merge (`data-merge.yml`)

A GitHub Actions workflow that merges per-language app data into `main.json`.

### Schedule

- **Hourly**: Runs every hour via cron (`7 * * * *`)
- **On push**: Triggered when files under `chok-data/apps/` change
- **Manual**: Can be triggered via `workflow_dispatch`

### Steps

1. Checkout repository
2. Install Python 3.12 with pip dependencies (DuckDB, requests)
3. Run `merge_to_main.py` to combine per-language files into `main.json`
4. Run `link_checker.py` to verify download link health
5. Commit and push updated `main.json` if changed

## Merge Script (`merge_to_main.py`)

Merges per-language app JSONs from `apps/{uid}/{lang}.json` into `main.json`.

### How It Works

1. Walks `apps/` directory for subdirectories (each is a UID)
2. Reads `en.json` for shared fields (logo, categories, downloads, etc.)
3. Reads all language files for localized fields (name, summary, description)
4. Assembles combined app objects with `names`, `summaries`, `descriptions` maps
5. Sorts by UID and writes to `main.json`

### Usage

```bash
cd chok-data
pip install duckdb
python scripts/merge_to_main.py
```

## Link Checker (`link_checker.py`)

Checks all download links in `main.json` for connectivity issues.

### How It Works

1. Reads `main.json`
2. Sends HEAD requests to each download link
3. Records any 4xx/5xx responses or connection errors
4. Submits issues to the server API via `POST /api/ci/issues`
5. Falls back to local `issues_pending.json` if API is unreachable

### Usage

```bash
export CHOKAPP_API_URL=http://localhost:8888
cd chok-data
python scripts/link_checker.py
```

## Migration Script (`migrate_to_lang_files.py`)

One-time script to migrate from old single-file format (`apps/{uid}.json`) to new per-language format (`apps/{uid}/{lang}.json`).

```bash
cd chok-data
python scripts/migrate_to_lang_files.py
```

This splits each app's multi-language data into separate files and removes the old single files.
