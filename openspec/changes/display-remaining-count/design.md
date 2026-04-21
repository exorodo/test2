## Context

The app is a single-page HTML/JS todo app. State is managed in a `todos` array; `render()` rebuilds the list DOM on every change. There is no build step — all code lives in `src/index.html`.

## Goals / Non-Goals

**Goals:**
- Show a live count of incomplete todos in a footer row below the list
- Singular/plural label: "1 item left" vs "N items left"
- Count is always based on all todos (not the filtered view)

**Non-Goals:**
- Counts for completed or total todos
- Animations or transitions on count change

## Decisions

**Where**: Footer sits between `#todo-list` and `.filter-bar`. This matches TodoMVC convention and groups status info together with filter controls.

**When updated**: Inside `render()` — already called on every state mutation (add, delete, toggle). No separate update path needed.

**Count source**: `todos.filter(t => !t.completed).length` — always reflects all todos regardless of active filter.

## Risks / Trade-offs

No meaningful risks. Change is additive and isolated to `render()` and markup.
