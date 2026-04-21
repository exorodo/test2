## Context

The app is a single-page HTML/JS todo app with no build step. State lives in a `todos` array; `render()` rebuilds the DOM on every change and is already called for every mutation (add, toggle, delete). There is no server — persistence must be client-side.

## Goals / Non-Goals

**Goals:**
- Restore todos on page load from `localStorage`
- Save todos on every state change (add, toggle, delete)
- Graceful empty-state when storage is absent or corrupt

**Non-Goals:**
- Server-side or cross-device sync
- Storage quota handling or compression
- Migration of data from a prior schema

## Decisions

**Storage key**: `'todos'` — simple, matches the array name, no namespacing needed at this scale.

**Save location**: Inside `render()` — already the single point called after every mutation. No separate save path avoids divergence bugs.

**Load location**: Once at app init, synchronously before the first `render()` call. Synchronous read is safe here (small payload, no network).

**Fallback**: Wrap the load in `try/catch`; default to `[]` on any error (missing key, corrupt JSON). Silently recovers — no error UI needed.

**Serialization**: `JSON.stringify` / `JSON.parse` — sufficient for `{id, text, completed}` shape.

## Risks / Trade-offs

- **Storage limit**: `localStorage` is capped at ~5 MB. Not a concern for a personal todo list.
- **Private/incognito mode**: `localStorage` may throw in some browsers. The `try/catch` fallback handles this — app starts empty.
