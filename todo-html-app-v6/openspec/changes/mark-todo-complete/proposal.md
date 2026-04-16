## Why

Users need to track progress through their todo list. Without a way to mark items complete, every item looks the same regardless of whether it's been done. The `completed` field already exists on each todo object — this change wires up the UI to expose it.

## What Changes

- Add a checkbox input to each todo item in `render()`
- Apply a `completed` CSS class to done items (strikethrough text, muted color)
- Toggle `completed` via event delegation on click — no full re-render, direct DOM update
- Persist the toggled state to localStorage

## Capabilities

### New Capabilities

- `toggle-todo-complete`: Toggle a todo item between complete and incomplete via checkbox, with visual feedback and localStorage persistence

### Modified Capabilities

*(none — add and delete capabilities are unaffected)*

## Impact

- `src/index.html` only: checkbox added to item template in `render()`, CSS for `.todo-item.completed`, toggle handler via event delegation
