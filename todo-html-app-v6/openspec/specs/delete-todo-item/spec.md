# delete-todo-item Specification

## Purpose
TBD - created by archiving change delete-todo-item. Update Purpose after archive.
## Requirements
### Requirement: Delete button visibility on hover and focus
Each todo item SHALL display a delete button that is hidden by default and becomes visible when the item is hovered or focused via keyboard.

#### Scenario: Delete button appears on hover
- **WHEN** the user moves the mouse over a todo item
- **THEN** the delete button (×) becomes visible on that item

#### Scenario: Delete button appears on keyboard focus
- **WHEN** the user navigates to a todo item using the Tab key so that focus is within the item
- **THEN** the delete button becomes visible on that item

#### Scenario: Delete button is hidden when not hovered or focused
- **WHEN** the user is not hovering over or focusing a todo item
- **THEN** the delete button for that item is not visible

---

### Requirement: Delete todo item on click
The system SHALL permanently remove a todo item from the list when the user activates its delete button.

#### Scenario: Delete item by clicking button
- **WHEN** the user clicks the delete button on a todo item
- **THEN** that item is immediately removed from the visible list

#### Scenario: Delete removes item from localStorage
- **WHEN** a todo item is deleted
- **THEN** the item is no longer present in localStorage
- **AND** the item does not reappear after a page refresh

#### Scenario: Delete newly added item
- **WHEN** the user adds a new todo item and then clicks its delete button
- **THEN** the newly added item is removed from the list

---

### Requirement: Empty state after last item deleted
The system SHALL display an appropriate empty state when all todo items have been deleted.

#### Scenario: Last item deleted
- **WHEN** the user deletes the last remaining todo item
- **THEN** the todo list is empty
- **AND** an empty state message is shown

---

### Requirement: Keyboard accessibility for delete
The delete button SHALL be operable via keyboard alone.

#### Scenario: Delete via keyboard
- **WHEN** the user tabs to a todo item, tabs to its delete button, and presses Enter or Space
- **THEN** the item is deleted

#### Scenario: Delete button has accessible label
- **WHEN** a screen reader focuses the delete button
- **THEN** it announces an accessible label (e.g. "Delete todo")

