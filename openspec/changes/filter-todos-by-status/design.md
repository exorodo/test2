# Design — filter-todos-by-status

## Technical Approach

The app is a single HTML file (`todo-html-app-v6/src/index.html`). All changes are confined to that file — no new files in `src/`.

## State

Add one variable alongside the existing `todos` array:

```js
let currentFilter = 'all'; // 'all' | 'active' | 'completed'
```

## Filtering Logic

Extract a `getFilteredTodos()` helper used by `render()`:

```js
function getFilteredTodos() {
  if (currentFilter === 'active')    return todos.filter(t => !t.completed);
  if (currentFilter === 'completed') return todos.filter(t => t.completed);
  return todos;
}
```

`render()` iterates over `getFilteredTodos()` instead of `todos` directly. No other changes to render logic.

## Markup

Add a filter bar between the todo list and any footer, inside `<main>`:

```html
<div class="filter-bar">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="active">Active</button>
  <button class="filter-btn" data-filter="completed">Completed</button>
</div>
```

## Event Handling

Single delegated listener on `.filter-bar`:

```js
document.querySelector('.filter-bar').addEventListener('click', function(e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  currentFilter = btn.dataset.filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
  render();
});
```

## CSS

```css
.filter-bar {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 16px 0 8px;
}
.filter-btn {
  padding: 4px 14px;
  border: 1.5px solid #ddd;
  border-radius: 20px;
  background: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
}
.filter-btn.active {
  border-color: #c0392b;
  color: #c0392b;
  font-weight: 600;
}
```

## Test Strategy

Tests live in `test/filter-by-status.test.js`. Since the app is a plain HTML file with inline JS, tests will use **jsdom** to load and exercise the DOM directly — no build step required.

Each Given/When/Then scenario from the spec maps to one test case.

## Files Changed

| File | Change |
|------|--------|
| `todo-html-app-v6/src/index.html` | Add filter state, `getFilteredTodos()`, filter bar markup, CSS, event listener |
| `test/filter-by-status.test.js` | New — unit tests for all filter scenarios |
