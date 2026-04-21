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

function checkTodo(dom, index) {
  const items = dom.window.document.querySelectorAll('#todo-list .todo-item');
  const checkbox = items[index].querySelector('.todo-check');
  checkbox.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
}

function deleteTodo(dom, index) {
  const items = dom.window.document.querySelectorAll('#todo-list .todo-item');
  const btn = items[index].querySelector('.todo-delete');
  btn.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
}

function getRemainingCountText(dom) {
  const el = dom.window.document.getElementById('todo-count');
  if (!el) throw new Error('Element #todo-count not found in the DOM');
  return el.textContent.trim();
}

// Scenario 1: Footer shows "3 items left" on load when 3 active, 1 completed
test('Footer shows "3 items left" on load with 3 active and 1 completed todo', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  addTodo(dom, 'Read book');
  addTodo(dom, 'Write tests');
  checkTodo(dom, 3); // complete "Write tests"
  expect(getRemainingCountText(dom)).toBe('3 items left');
});

// Scenario 2: Footer shows "0 items left" when there are no todos
test('Footer shows "0 items left" when no todos exist', () => {
  const dom = createDOM();
  expect(getRemainingCountText(dom)).toBe('0 items left');
});

// Scenario 3: Footer shows "3 items left" after adding a todo (was "2 items left")
test('Footer updates to "3 items left" after adding a todo', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  expect(getRemainingCountText(dom)).toBe('2 items left');
  addTodo(dom, 'Read book');
  expect(getRemainingCountText(dom)).toBe('3 items left');
});

// Scenario 4: Footer shows "1 item left" after completing a todo (was "2 items left") — singular
test('Footer updates to "1 item left" after completing a todo', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  expect(getRemainingCountText(dom)).toBe('2 items left');
  checkTodo(dom, 0); // complete "Buy milk"
  expect(getRemainingCountText(dom)).toBe('1 item left');
});

// Scenario 5: Footer shows "1 item left" after deleting an active todo (was "2 items left")
test('Footer updates to "1 item left" after deleting an active todo', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  expect(getRemainingCountText(dom)).toBe('2 items left');
  deleteTodo(dom, 0); // delete "Buy milk"
  expect(getRemainingCountText(dom)).toBe('1 item left');
});

// Scenario 6: Singular — exactly 1 active todo → "1 item left" (no trailing 's')
test('Footer shows "1 item left" with no trailing s when exactly 1 active todo', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  const text = getRemainingCountText(dom);
  expect(text).toBe('1 item left');
  expect(text).not.toBe('1 items left');
});

// Scenario 7: Plural — 0 active todos → "0 items left" (with trailing 's')
test('Footer shows "0 items left" with trailing s when all todos are completed', () => {
  const dom = createDOM();
  addTodo(dom, 'Buy milk');
  addTodo(dom, 'Walk dog');
  checkTodo(dom, 0);
  checkTodo(dom, 0); // after first is completed, second is now index 0 (or still 1 depending on filter)
  // Complete all by re-querying
  const dom2 = createDOM();
  addTodo(dom2, 'Buy milk');
  checkTodo(dom2, 0);
  expect(getRemainingCountText(dom2)).toBe('0 items left');
});
