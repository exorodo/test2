## ADDED Requirements

### Requirement: Checkbox visible on each todo item
Each todo item SHALL display a checkbox input that reflects the item's current completed state.

#### Scenario: Checkbox shown unchecked for active item
- **WHEN** a todo item has `completed: false`
- **THEN** its checkbox is rendered unchecked

#### Scenario: Checkbox shown checked for completed item
- **WHEN** a todo item has `completed: true`
- **THEN** its checkbox is rendered checked

---

### Requirement: Toggle complete on checkbox click
The system SHALL toggle a todo item's completed state when the user clicks its checkbox.

#### Scenario: Mark item as complete
- **WHEN** the user clicks the unchecked checkbox on an active todo item
- **THEN** the item's `completed` field becomes `true`
- **AND** the item receives a strikethrough style and muted color
- **AND** the checkbox appears checked

#### Scenario: Mark item as incomplete
- **WHEN** the user clicks the checked checkbox on a completed todo item
- **THEN** the item's `completed` field becomes `false`
- **AND** the strikethrough and muted color are removed
- **AND** the checkbox appears unchecked

---

### Requirement: Completed state persisted to localStorage
The system SHALL save the updated completed state to localStorage after every toggle.

#### Scenario: State survives page reload
- **WHEN** the user marks an item complete and reloads the page
- **THEN** the item is still shown as complete with checkbox checked

---

### Requirement: Keyboard accessibility for toggle
The checkbox SHALL be operable via keyboard.

#### Scenario: Toggle via keyboard
- **WHEN** the user tabs to a checkbox and presses Space
- **THEN** the item's completed state is toggled

#### Scenario: Checkbox has accessible label
- **WHEN** a screen reader focuses the checkbox
- **THEN** it announces an accessible label (e.g. "Mark complete")
