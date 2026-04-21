# todo-persistence

Saves and restores the todos array via localStorage so state survives page reloads and browser restarts.

## ADDED Requirements

### Requirement: The app MUST restore todos from localStorage on startup

The app SHALL read from `localStorage` under the key `'todos'` before the first render. If the key is absent or the value cannot be parsed, the app SHALL default to an empty array without throwing an error.

#### Scenario: Todos restored on page load
**Given** localStorage contains a previously saved todos array
**When** the page loads
**Then** all todos (text and completed status) are visible before the user interacts

#### Scenario: App starts empty when no localStorage data exists
**Given** localStorage has no 'todos' key
**When** the page loads
**Then** the todo list is empty and no error occurs

#### Scenario: App recovers from corrupt localStorage data
**Given** localStorage contains an unparseable value under 'todos'
**When** the page loads
**Then** the todo list is empty and no error occurs

### Requirement: The app MUST persist todos to localStorage on every state change

The app SHALL write the full `todos` array to `localStorage` under key `'todos'` inside `render()`, which is called after every add, toggle, and delete operation. No separate save path SHALL be required.

#### Scenario: localStorage updated after adding a todo
**Given** the app has 0 todos in localStorage
**When** the user adds a new todo
**Then** localStorage contains the new todo

#### Scenario: localStorage updated after toggling a todo
**Given** the app has 1 active todo in localStorage
**When** the user marks it as complete
**Then** localStorage reflects completed === true for that todo

#### Scenario: localStorage updated after deleting a todo
**Given** the app has 2 todos in localStorage
**When** the user deletes one
**Then** localStorage contains only the remaining todo
