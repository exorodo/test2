## Why

Todos are held in memory only and are lost on every page reload or browser close. Users have no persistence across sessions, making the app impractical for real use.

## What Changes

- The app reads todos from `localStorage` on startup, restoring full state before the first render
- Every call to `render()` writes the current `todos` array to `localStorage`
- A parse error or missing key silently defaults to an empty list

## Capabilities

### New Capabilities
- `todo-persistence`: Saves and restores the todos array via localStorage so state survives page reloads and browser restarts

### Modified Capabilities

## Impact

- `todo-html-app-v6/src/index.html` — load from localStorage at init, save inside `render()`
