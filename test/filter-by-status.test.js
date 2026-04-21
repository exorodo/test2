const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../todo-html-app-v6/src/index.html');

function createDOM() {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'http://localhost',
  });
  return dom;
}

function addTodo(dom, text) {
  const input = dom.window.document.getElementById('new-todo');
  const btn = dom.window.document.getElementById('add-btn');
  input.value = text;
  btn.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
}

function clickFilter(dom, filter) {
  const btn = dom.window.document.querySelector(`.filter-btn[data-filter="${filter}"]`);
  if (!btn) throw new Error(`Filter button "${filter}" not found`);
  btn.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
}

function getVisibleTodos(dom) {
  return [...dom.window.document.querySelectorAll('#todo-list .todo-item')];
}

function checkTodo(dom, index) {
  const items = dom.window.document.querySelectorAll('#todo-list .todo-item');
  const checkbox = items[index].querySelector('.todo-check');
  checkbox.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
}

// 6.2 — All filter shows all todos
test('All filter shows all todos', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  clickFilter(dom, 'all');
  expect(getVisibleTodos(dom).length).toBe(2);
});

// 6.3 — Active filter shows only incomplete todos
test('Active filter shows only incomplete todos', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  checkTodo(dom, 0); // complete first todo
  clickFilter(dom, 'active');
  const visible = getVisibleTodos(dom);
  expect(visible.length).toBe(1);
  expect(visible[0].querySelector('.todo-item-text').textContent).toBe('Walk dog');
});

// 6.4 — Completed filter shows only completed todos
test('Completed filter shows only completed todos', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  checkTodo(dom, 0); // complete first todo
  clickFilter(dom, 'completed');
  const visible = getVisibleTodos(dom);
  expect(visible.length).toBe(1);
  expect(visible[0].querySelector('.todo-item-text').textContent).toBe('Buy milk');
});

// 6.5 — Adding a todo while Active filter is on makes it appear
test('New todo appears when Active filter is active', () => {
  const dom = createDOM();
  clickFilter(dom, 'active');
  addTodo(dom, 'New task');
  expect(getVisibleTodos(dom).length).toBe(1);
});

// 6.6 — Adding a todo while Completed filter is on does NOT make it appear
test('New todo does not appear when Completed filter is active', () => {
  const dom = createDOM();
  clickFilter(dom, 'completed');
  addTodo(dom, 'New task');
  expect(getVisibleTodos(dom).length).toBe(0);
});

// 6.7 — Completing a todo while Active filter is on removes it from view
test('Completing a todo while Active filter is on removes it from view', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  clickFilter(dom, 'active');
  expect(getVisibleTodos(dom).length).toBe(2);
  checkTodo(dom, 0);
  expect(getVisibleTodos(dom).length).toBe(1);
});

// 6.8 — Completing a todo while Completed filter is on keeps it visible
test('Completing a todo while Completed filter is on keeps it visible', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  checkTodo(dom, 0); // complete first
  clickFilter(dom, 'completed');
  expect(getVisibleTodos(dom).length).toBe(1);
  // complete the second one while filter is on completed
  // need to find it via All first, complete it, then check
  clickFilter(dom, 'all');
  checkTodo(dom, 1);
  clickFilter(dom, 'completed');
  expect(getVisibleTodos(dom).length).toBe(2);
});
