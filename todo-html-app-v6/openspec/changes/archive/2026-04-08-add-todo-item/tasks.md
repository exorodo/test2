## 1. HTML Skeleton

- [x] 1.1 Create `src/index.html` with `<!DOCTYPE html>`, `<html lang="en">`, `<head>` (charset, viewport, title), and `<body>`
- [x] 1.2 Add comment section dividers: `<!-- === STYLES === -->`, `<!-- === MARKUP === -->`, `<!-- === SCRIPT === -->`
- [x] 1.3 Add a `<main>` container with a centered card layout and app title "todos"

## 2. Input UI

- [x] 2.1 Add `<input type="text">` with `id="new-todo"`, `aria-label="New todo"`, and `placeholder="What needs to be done?"`
- [x] 2.2 Add an `<button id="add-btn">Add</button>` next to the input
- [x] 2.3 Add an empty `<ul id="todo-list">` below the input for rendering items

## 3. CSS Styles

- [x] 3.1 Add a CSS reset (box-sizing, margin, padding) and base body styles (font, background, color)
- [x] 3.2 Style the centered card container (max-width, margin auto, padding, border-radius, box-shadow)
- [x] 3.3 Style the input field (full width, padding, border, border-radius, font-size)
- [x] 3.4 Style the Add button (padding, background color, text color, border, cursor, hover state)
- [x] 3.5 Style the todo list (`list-style: none`, padding 0, margin 0)

## 4. JavaScript — State and Data Model

- [x] 4.1 Declare `let todos = []` as the in-memory state array at the top of the script block
- [x] 4.2 Implement `createTodo(text)` that returns `{ id: crypto.randomUUID(), text: text.trim(), completed: false, createdAt: new Date().toISOString() }`

## 5. JavaScript — Add Handler

- [x] 5.1 Implement `addTodo()` function: reads input value, trims it, validates (non-empty, ≤ 200 chars), pushes `createTodo(text)` to `todos`, clears and re-focuses the input
- [x] 5.2 Attach `keydown` listener on `#new-todo`: call `addTodo()` when `event.key === 'Enter'`
- [x] 5.3 Attach `click` listener on `#add-btn`: call `addTodo()`

## 6. JavaScript — Render

- [x] 6.1 Implement `render()` function: clears `#todo-list` innerHTML and re-builds `<li>` elements from `todos` array (show `todo.text` as list item text for now)
- [x] 6.2 Call `render()` at the end of `addTodo()` after mutating state
- [x] 6.3 Call `render()` once on page load to initialise the empty list

## 7. Verification

- [ ] 7.1 Open `src/index.html` via `file://` in Chrome — add an item with Enter, verify it appears
- [ ] 7.2 Open in Firefox — verify same behaviour
- [ ] 7.3 Verify empty/whitespace input does not create an item
- [ ] 7.4 Verify input is cleared and focused after a successful add
- [ ] 7.5 Verify keyboard-only flow: Tab to input → type → Enter → item added
