# Tasks — filter-todos-by-status

## Task 1 — Filter state variable
- [x] 1.1 Add `let currentFilter = 'all'` alongside the `todos` state variable in `todo-html-app-v6/src/index.html`

## Task 2 — getFilteredTodos helper
- [x] 2.1 Add `getFilteredTodos()` function that returns `todos` filtered by `currentFilter` ('all' | 'active' | 'completed')
- [x] 2.2 Update `render()` to iterate over `getFilteredTodos()` instead of `todos` directly

## Task 3 — Filter bar markup
- [x] 3.1 Add `.filter-bar` div with three `.filter-btn` buttons (All, Active, Completed) inside `<main>`, after `<ul id="todo-list">`
- [x] 3.2 Set `data-filter` attribute on each button ('all', 'active', 'completed')
- [x] 3.3 Add `.active` class to the All button by default

## Task 4 — Filter bar styles
- [x] 4.1 Add CSS for `.filter-bar`, `.filter-btn`, and `.filter-btn.active` in the `<style>` block

## Task 5 — Filter event listener
- [x] 5.1 Add delegated click listener on `.filter-bar` that updates `currentFilter`, toggles `.active` class on buttons, and calls `render()`

## Task 6 — Tests (TDD — write before implementing each task above)
- [x] 6.1 Create `test/filter-by-status.test.js` with jsdom setup and a helper to load `index.html`
- [x] 6.2 Test: All filter shows all todos
- [x] 6.3 Test: Active filter shows only incomplete todos
- [x] 6.4 Test: Completed filter shows only completed todos
- [x] 6.5 Test: adding a todo while Active filter is on makes it appear
- [x] 6.6 Test: adding a todo while Completed filter is on does not make it appear
- [x] 6.7 Test: completing a todo while Active filter is on removes it from view
- [x] 6.8 Test: completing a todo while Completed filter is on keeps it visible
