## 1. HTML — Add delete button to todo item template

- [x] 1.1 In `src/index.html`, locate the `renderTodo()` function (or the HTML template used to create todo items)
- [x] 1.2 Add a `<button class="todo-delete" aria-label="Delete todo">×</button>` element inside each todo item's HTML structure

## 2. CSS — Show delete button on hover and focus

- [x] 2.1 In `src/index.html` CSS, add `.todo-delete { opacity: 0; }` to hide the button by default
- [x] 2.2 Add `.todo-item:hover .todo-delete, .todo-item:focus-within .todo-delete { opacity: 1; }` to reveal the button on hover or focus

## 3. JavaScript — Delete handler

- [x] 3.1 In `src/index.html` JS, add a `click` event listener on the todo list container using event delegation
- [x] 3.2 In the handler, check if `event.target` matches `.todo-delete`
- [x] 3.3 Find the parent `.todo-item` element and get its index or ID
- [x] 3.4 Remove the item from the todos array
- [x] 3.5 Save the updated array to `localStorage`
- [x] 3.6 Remove the `.todo-item` DOM element from the list

## 4. Edge cases

- [x] 4.1 After deleting the last item, verify the empty state message is shown (if the app has one; add one if not)
- [x] 4.2 Verify that newly added items also have a working delete button (no extra wiring needed due to event delegation)
