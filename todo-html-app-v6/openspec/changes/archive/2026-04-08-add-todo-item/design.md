## Context

This is the first feature of the todo app. The app is a single `src/index.html` file with no build step, no npm, and no external dependencies — it must work when opened directly via `file://` in a browser. This design establishes the foundational HTML structure, CSS layout, and JS state model that all subsequent features (completion, deletion, filtering, persistence) will build on.

## Goals / Non-Goals

**Goals:**
- Define the HTML skeleton, CSS reset/layout, and JS state model used across the whole app
- Implement the add-item input + submit handler as the first interactive feature
- Keep the architecture simple enough that future tickets can add capabilities with minimal refactoring

**Non-Goals:**
- Rendering the list of todos (belongs to the render/display feature)
- Persisting todos to localStorage (TODO4-31)
- Filtering, deletion, or completion toggle (separate tickets)

## Decisions

**Single-file architecture**
All HTML, CSS, and JS live in `src/index.html`. Rationale: the constraint is explicit in the project spec — no build tools, must work via `file://`. Inline `<style>` and `<script>` tags are the only viable approach.

**In-memory `todos` array as single source of truth**
A module-scoped `let todos = []` array holds all state. Every user action mutates this array and then calls a `render()` function to re-draw the list. Rationale: simplest reactive pattern without a framework; easy to extend with localStorage serialisation later (TODO4-31).

**`crypto.randomUUID()` for IDs**
Available in all modern browsers without polyfills, including via `file://`. Rationale: avoids a Math.random() collision risk and requires zero dependencies.

**`render()` full re-render on every change**
Rather than diffing the DOM, `render()` clears the list container and rebuilds it from the `todos` array each time. Rationale: with a small in-browser todo list, performance is not a concern; simplicity beats optimisation here.

**Enter key + button both call the same `addTodo()` function**
A single `keydown` listener on the input and a `click` listener on the button both invoke `addTodo()`. Rationale: single responsibility, easy to test in isolation.

## Risks / Trade-offs

[Full re-render on every change] → DOM is rebuilt from scratch each time, which loses focus state on the input for a split second. Mitigation: explicitly re-focus the input after `render()` completes.

[Single file grows large] → As features are added the file will grow. Mitigation: use clear comment sections (`<!-- === STYLES === -->`, `<!-- === MARKUP === -->`, `<!-- === SCRIPT === -->`). No refactoring needed until the app is feature-complete.

## Open Questions

- Should the 200-char limit be enforced silently (ignore keystrokes beyond limit) or with a visible warning? Decision deferred — current spec says "do nothing"; a warning can be added later without breaking the data model.
