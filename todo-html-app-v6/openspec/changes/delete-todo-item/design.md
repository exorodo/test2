## Context

The app is a single `src/index.html` file with inline CSS and JS. Todo items are rendered as DOM elements from a JavaScript array that is persisted in `localStorage`. There is no build step.

The delete feature requires: (1) a button element per todo item, (2) CSS to hide/show it on hover/focus, and (3) a JS handler that removes the item from the array, updates localStorage, and removes the DOM element.

## Goals / Non-Goals

**Goals:**
- Add delete button to each todo item (including dynamically added ones)
- Hide button by default, reveal on hover or keyboard focus-within
- Remove item from DOM, array, and localStorage on click
- Keyboard and screen-reader accessible

**Non-Goals:**
- Undo / confirmation dialog (not in v1)
- Bulk delete
- Animations on removal

## Decisions

**Event delegation over per-element listeners**
Attach a single `click` listener on the `<ul>` (todo list container) and check if `event.target` matches `.todo-delete`. This way dynamically added items work without any extra wiring.
*Alternative considered*: adding a listener to each button at creation time — rejected because it requires cleanup and doesn't scale.

**CSS `opacity` + `focus-within` for visibility**
Use `.todo-item .todo-delete { opacity: 0 }` and reveal with `.todo-item:hover .todo-delete, .todo-item:focus-within .todo-delete { opacity: 1 }`. `focus-within` ensures the button appears when the item or any of its children (including the delete button itself) is focused.
*Alternative considered*: `visibility: hidden` — rejected because it still occupies space and has the same transition behavior.

**Same `renderTodo()` function for initial and dynamic items**
The delete button is part of the todo item HTML template inside `renderTodo()`. Both initial load (from localStorage) and new items use the same function, so no duplication.

## Risks / Trade-offs

- **`focus-within` browser support**: Supported in all modern browsers. Not relevant since the app targets modern file:// usage.
- **Opacity-0 button still in tab order**: The delete button is always tabbable even when visually hidden. This is intentional — it makes keyboard navigation consistent. Screen readers will still announce it.

## Open Questions

*(none)*
