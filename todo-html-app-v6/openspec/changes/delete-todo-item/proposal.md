## Why

Users need to remove individual todo items from the list. Without a delete capability, the list can only grow, forcing users to complete every item they ever created even if it's no longer relevant.

## What Changes

- Add a delete button (`×`) to each todo item that appears on hover or keyboard focus
- Clicking the delete button permanently removes that item from the list and from localStorage
- If the list becomes empty after deletion, show an empty state message

## Capabilities

### New Capabilities

- `delete-todo-item`: Delete a single todo item from the list via a hover/focus-revealed button, with immediate DOM removal and localStorage sync

### Modified Capabilities

*(none — the add-todo-item capability is unaffected)*

## Impact

- `src/index.html`: add delete button markup to todo item template, add CSS for hover/focus visibility, add JS event listener for deletion and localStorage update
- No new files — all changes are contained within the single HTML file
