## 1. CSS — Completed item styles and checkbox appearance

- [x] 1.1 Add `.todo-item.completed .todo-item-text { text-decoration: line-through; color: #aaa; }` to `src/index.html` CSS
- [x] 1.2 Style the checkbox input (`.todo-check`) to align with the app theme: appropriate size, cursor pointer, accent color matching `#c0392b`

## 2. HTML — Add checkbox to render()

- [x] 2.1 In `render()`, create a `<input type="checkbox" class="todo-check" aria-label="Mark complete">` element before the text span
- [x] 2.2 Set `checkbox.checked = todo.completed` to reflect current state
- [x] 2.3 Add `completed` class to the `li` when `todo.completed` is true: `li.className = 'todo-item' + (todo.completed ? ' completed' : '')`

## 3. JavaScript — Toggle handler via event delegation

- [x] 3.1 In the existing `#todo-list` click handler, add a branch for `.todo-check` clicks (alongside the existing `.todo-delete` branch)
- [x] 3.2 Find the parent `.todo-item` li and get its `data-id`
- [x] 3.3 Find the todo in the array by id and toggle its `completed` field
- [x] 3.4 Save updated array to localStorage via `saveTodos()`
- [x] 3.5 Toggle the `completed` CSS class on the `li` directly (no full re-render)
- [x] 3.6 Sync the checkbox `checked` state with the new value
