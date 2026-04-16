## Context

The todo data model already has `completed: false` on every item. The `render()` function rebuilds the list from scratch. The delete handler uses event delegation on `#todo-list`. This change follows the same pattern.

## Goals / Non-Goals

**Goals:**
- Add checkbox to each todo item (checked state reflects `todo.completed`)
- Toggle `completed` in the array and localStorage on click
- Apply `.completed` CSS class for visual feedback — no full re-render

**Non-Goals:**
- Filtering by status (separate ticket TODO4-29)
- Item count display (separate ticket TODO4-30)
- Animations

## Decisions

**Direct DOM toggle, no full re-render**
On checkbox click: toggle the `completed` field in the array, save to localStorage, then toggle the `completed` CSS class on the `li` and update the `checked` attribute directly. A full `render()` call would work but causes a flash and loses focus — unnecessary for a single field change.

**Checkbox before text in the DOM**
Structure: `[checkbox] [text span] [delete button]`. Checkbox first so Tab order is natural: checkbox → delete.

**CSS class on `li`, not on the span**
`.todo-item.completed .todo-item-text` scopes the strikethrough style cleanly and allows future selectors (e.g. filters) to target the `li` class directly.

**`aria-label="Mark complete"` on checkbox**
The checkbox has no visible label text — the `aria-label` is essential for screen readers.

## Risks / Trade-offs

- **`completed` class on `li` after render**: `render()` already sets `li.className = 'todo-item'`. Must also conditionally add `completed` when `todo.completed` is true during initial render.

## Open Questions

*(none)*
