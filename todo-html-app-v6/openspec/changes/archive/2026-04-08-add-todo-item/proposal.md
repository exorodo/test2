## Why

Users need a way to create todo items — it is the foundational interaction of the app. Without the ability to add items, no other feature (completion, deletion, filtering) has any value to operate on.

## What Changes

- Add an HTML `<input>` field with placeholder "What needs to be done?" and an associated Add button
- Implement a `addTodo(text)` JavaScript function that creates a todo object (`id`, `text`, `completed`, `createdAt`) and appends it to the in-memory list
- Render the new item at the bottom of the todo list on each add
- Validate input: ignore empty or whitespace-only submissions; ignore submissions over 200 chars
- Clear and re-focus the input after a successful add
- Wire Enter key and Add button click to the same submit handler

## Capabilities

### New Capabilities
- `add-todo-item`: Captures user input and creates a new todo entry in the list with full validation and accessibility support

### Modified Capabilities
<!-- None — this is the initial implementation of the app -->

## Impact

- **Files**: `src/index.html` (created from scratch — HTML structure, CSS styles, JS logic all in one file)
- **Data**: In-memory `todos` array; individual item shape: `{ id, text, completed, createdAt }`
- **Dependencies**: None — no external libraries or build tools
- **Related tickets**: TODO4-31 (localStorage persistence) will extend this foundation
