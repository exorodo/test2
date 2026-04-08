## ADDED Requirements

### Requirement: User can type a new todo item
The system SHALL provide a text input field that accepts a task description and an Add button (or Enter key) to submit it. The input SHALL display a placeholder of "What needs to be done?".

#### Scenario: Add item via Enter key
- **WHEN** the user types non-empty text (≤ 200 chars) in the input and presses Enter
- **THEN** a new todo item is appended to the bottom of the list with `completed: false`

#### Scenario: Add item via Add button
- **WHEN** the user types non-empty text (≤ 200 chars) and clicks the Add button
- **THEN** a new todo item is appended to the bottom of the list with `completed: false`

#### Scenario: Input is cleared after successful add
- **WHEN** a todo item is successfully added
- **THEN** the input field is cleared and focused, ready for the next entry

### Requirement: Input validation prevents empty todos
The system SHALL ignore submission attempts when the input is empty or contains only whitespace.

#### Scenario: Empty input is ignored
- **WHEN** the user presses Enter or clicks Add with an empty input
- **THEN** no item is created and the list remains unchanged

#### Scenario: Whitespace-only input is ignored
- **WHEN** the user presses Enter or clicks Add with input containing only spaces
- **THEN** no item is created and the list remains unchanged

### Requirement: Todo item data model
Each todo item created by the system SHALL have the following fields:
- `id`: UUID string, generated at creation time
- `text`: string, trimmed, 1–200 characters
- `completed`: boolean, defaults to `false`
- `createdAt`: ISO 8601 timestamp string

#### Scenario: New item has correct default state
- **WHEN** a new todo is added with text "Buy milk"
- **THEN** the item has `completed: false`, a non-empty `id`, a valid `createdAt` timestamp, and `text` equal to "Buy milk"

### Requirement: Keyboard and screen reader accessibility
The input field SHALL be fully operable via keyboard alone and SHALL include an `aria-label` attribute for screen readers.

#### Scenario: Full add flow without mouse
- **WHEN** the user navigates to the input using Tab and types a task and presses Enter
- **THEN** the item is added without requiring mouse interaction

#### Scenario: Input has accessible label
- **WHEN** a screen reader focuses the input
- **THEN** it reads an accessible label (e.g., "New todo")
