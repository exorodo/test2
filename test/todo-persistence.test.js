const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../todo-html-app-v6/src/index.html');
const STORAGE_KEY = 'todos';

function createDOM() {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'http://localhost',
  });
  return dom;
}

function createDOMWithStorage(seedItems) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'http://localhost',
    beforeParse(window) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems));
    },
  });
  return dom;
}

function createDOMWithCorruptStorage() {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    url: 'http://localhost',
    beforeParse(window) {
      window.localStorage.setItem(STORAGE_KEY, 'not valid json {{{{');
    },
  });
  return dom;
}

function addTodo(dom, text) {
  const input = dom.window.document.getElementById('new-todo');
  const btn = dom.window.document.getElementById('add-btn');
  input.value = text;
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

function deleteTodo(dom, index) {
  const items = dom.window.document.querySelectorAll('#todo-list .todo-item');
  const btn = items[index].querySelector('.todo-delete');
  btn.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
}

function getStoredTodos(dom) {
  const raw = dom.window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

// Test 1: Todos restored on page load
test('Todos restored on page load', () => {
  const seedItems = [
    { id: 'abc-1', text: 'Buy milk', completed: false, createdAt: new Date().toISOString() },
    { id: 'abc-2', text: 'Walk dog', completed: true, createdAt: new Date().toISOString() },
  ];
  const dom = createDOMWithStorage(seedItems);

  const items = getVisibleTodos(dom);
  expect(items.length).toBe(2);

  const texts = items.map(li => li.querySelector('.todo-item-text').textContent);
  expect(texts).toContain('Buy milk');
  expect(texts).toContain('Walk dog');

  const completedItem = items.find(li => li.querySelector('.todo-item-text').textContent === 'Walk dog');
  expect(completedItem.classList.contains('completed')).toBe(true);
});

// Test 2: App starts empty when no localStorage data exists
test('App starts empty when no localStorage data exists', () => {
  const dom = createDOM();

  const items = getVisibleTodos(dom);
  expect(items.length).toBe(0);
});

// Test 3: App recovers from corrupt localStorage data
test('App recovers from corrupt localStorage data', () => {
  expect(() => {
    const dom = createDOMWithCorruptStorage();
    const items = getVisibleTodos(dom);
    expect(items.length).toBe(0);
  }).not.toThrow();
});

// Test 4: localStorage updated after adding a todo
test('localStorage updated after adding a todo', () => {
  const dom = createDOM();

  addTodo(dom, 'Read a book');

  const stored = getStoredTodos(dom);
  expect(stored).not.toBeNull();
  expect(Array.isArray(stored)).toBe(true);
  expect(stored.length).toBe(1);
  expect(stored[0].text).toBe('Read a book');
  expect(stored[0].completed).toBe(false);
});

// Test 5: localStorage updated after toggling a todo
test('localStorage updated after toggling a todo', () => {
  const dom = createDOM();

  addTodo(dom, 'Exercise');
  checkTodo(dom, 0);

  const stored = getStoredTodos(dom);
  expect(stored).not.toBeNull();
  expect(stored.length).toBe(1);
  expect(stored[0].text).toBe('Exercise');
  expect(stored[0].completed).toBe(true);
});

// Test 6: localStorage updated after deleting a todo
test('localStorage updated after deleting a todo', () => {
  const dom = createDOM();

  addTodo(dom, 'First task');
  addTodo(dom, 'Second task');
  deleteTodo(dom, 0);

  const stored = getStoredTodos(dom);
  expect(stored).not.toBeNull();
  expect(stored.length).toBe(1);
  expect(stored[0].text).toBe('Second task');
});
