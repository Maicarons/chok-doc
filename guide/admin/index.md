# Admin Panel

The CHOKAPP Admin Panel provides a web interface for managing app data, reviewing submissions, and administering users.

## Tech Stack

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **UI Library**: Element Plus
- **State Management**: Pinia
- **Build Tool**: Vite 5

## Pages

| Page | Description | Access |
|------|-------------|--------|
| Dashboard | System stats, charts, pending counts | All authenticated |
| App Management | Browse and search all apps | All authenticated |
| Submit App | Submit new app data for review | All authenticated |
| Review Submissions | Approve/reject data submissions | Reviewer, Admin |
| Issue Review | View and manage reported issues | All authenticated |
| Collections | Manage app collections | All authenticated |
| User Management | Manage user roles | Admin only |
| Settings | System configuration | All authenticated |

## Authentication

The admin panel uses GitHub OAuth for authentication. Users sign in with their GitHub account.

### Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: manage users, review submissions, all settings |
| **Reviewer** | Review submissions, manage issues |
| **User** | Submit app data, report issues, submit delete requests |

### Login Flow

1. User clicks "Sign in with GitHub" on the login page
2. Redirected to GitHub OAuth authorization page
3. After authorization, redirected back to `/callback`
4. Callback exchanges the OAuth code for a JWT token via `POST /api/auth/github`
5. Token stored in localStorage, used for all subsequent API requests via `Authorization: Bearer` header
6. Router guard checks authentication before each navigation

## Development

```bash
cd chok-admin
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` with API proxy to `http://localhost:8888`.

### Build

```bash
npm run build
```

Output goes to `dist/`.
