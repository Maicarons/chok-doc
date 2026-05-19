# Authentication & Authorization

## Overview

CHOKAPP uses GitHub OAuth for authentication combined with JWT for API authorization.

## Architecture

```
Browser                    Server                     GitHub
  |                          |                          |
  |-- GET /login ----------->|                          |
  |<-- GitHub OAuth URL -----|                          |
  |                                                     |
  |-- GET github.com/login -->|                          |
  |<-- Auth page -------------|                          |
  |-- Authorize ------------->|                          |
  |<-- Redirect /callback ----|                          |
  |                          |                          |
  |-- POST /api/auth/github ->|                          |
  |   { code: "..." }        |-- Exchange code -------->|
  |                          |<-- access_token ---------|
  |                          |-- GET /user ------------>|
  |                          |<-- user data ------------|
  |                          |                          |
  |                          |-- Create/update user in DB
  |                          |-- Generate JWT --------->|
  |<-- { token, user } -----|                          |
  |                          |                          |
  |-- API calls w/ Bearer -->|                          |
  |   Authorization header   |-- Validate JWT --------->|
  |                          |-- Check role ---------->|
  |<-- Response -------------|                          |
```

## JWT Token

- Signed with HMAC-SHA256 using a server-side secret
- Contains `user_id` and `role` claims
- Validated on every protected API request via middleware

## API Endpoints

### `POST /api/auth/github`
Exchange GitHub OAuth code for JWT.

```json
// Request
{ "code": "gh_oauth_code_from_callback" }

// Response
{
  "code": 0,
  "message": "login successful",
  "data": {
    "token": "eyJhbGciOiJI...",
    "user": {
      "id": 1,
      "github_id": 12345678,
      "username": "octocat",
      "avatar_url": "https://avatars.githubusercontent.com/u/12345678",
      "role": "user"
    }
  }
}
```

### `GET /api/auth/me`
Get current user info from JWT.

## Role-Based Access Control

Middleware checks JWT claims against required roles:

| Middleware | Allowed Roles |
|------------|--------------|
| `AuthMiddleware` | Any authenticated user |
| `AuthMiddleware("admin", "reviewer")` | Admin, Reviewer |
| `AuthMiddleware("admin")` | Admin only |

### Admin Panel Route Guards

The Vue Router runs `beforeEach` checks:
1. If route is public (`/login`, `/callback`) → allow
2. If no token in localStorage → redirect to `/login`
3. If token exists but user info not loaded → fetch `/api/auth/me`
4. If route has `meta.roles` → check user role matches

## Configuration

Server `config.json`:

```json
{
  "auth": {
    "jwt_secret": "your-secret-key",
    "github_client_id": "Ov23li...",
    "github_client_secret": "your-client-secret"
  }
}
```

Create a GitHub OAuth App at: https://github.com/settings/developers
- Homepage URL: `http://localhost:5173`
- Authorization callback URL: `http://localhost:5173/callback`
