# CHOKAPP Overview

CHOKAPP is a full-platform app discovery and sharing platform. It's like an App Store but without the download functionality — we provide links, not binaries.

## Design Philosophy

- **Discovery First**: Beautiful UI that makes browsing apps enjoyable
- **Link, Not Download**: We index apps and provide links to official download sources
- **Community Data**: All app metadata lives in a public GitHub repository as JSON
- **F-Droid Inspired**: Open-source ethos with a modern design language

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Client | Flutter + GetX | Cross-platform UI (6 platforms) |
| Server | Go + SQLite | REST API for dynamic data |
| Admin | Vue 3 + Element Plus | Data management dashboard |
| Data | GitHub + JSON | Static app metadata repository |
| Docs | VitePress | Project documentation |

## Key Features

### For Users
- Browse hot, latest, and recommended apps
- View detailed app pages with screenshots
- Access download links for multiple platforms
- Report issues with apps
- Multi-language support (en, zh-CN, zh-TW, ja)

### For Developers
- Submit your app by creating a JSON PR
- Track view and download statistics
- Get your app featured in collections

### For Administrators
- Review app submissions
- Manage issues and reports
- Curate collections and rankings
- Monitor with data dashboard
