# remaining-count Specification

## Purpose
TBD - created by archiving change display-remaining-count. Update Purpose after archive.
## Requirements
### Requirement: The app MUST display the count of active todos in a footer

A footer element SHALL be visible at all times below the todo list, showing the number of todos where `completed === false`. The count SHALL reflect all todos regardless of the currently active filter.

#### Scenario: Count shown on page load
**Given** the app loads with 3 active and 1 completed todo
**When** the page renders
**Then** the footer shows "3 items left"

#### Scenario: Count shown when list is empty
**Given** the app loads with no todos
**When** the page renders
**Then** the footer shows "0 items left"

### Requirement: The count MUST update immediately on every state change

The footer count SHALL update synchronously whenever a todo is added, deleted, or toggled. No page reload SHALL be required.

#### Scenario: Count updates after adding a todo
**Given** the footer shows "2 items left"
**When** the user adds a new todo
**Then** the footer immediately shows "3 items left"

#### Scenario: Count updates after completing a todo
**Given** the footer shows "2 items left"
**When** the user marks one todo as complete
**Then** the footer immediately shows "1 item left"

#### Scenario: Count updates after deleting an active todo
**Given** the footer shows "2 items left"
**When** the user deletes one active todo
**Then** the footer immediately shows "1 item left"

### Requirement: The count label MUST use correct singular and plural grammar

The system SHALL display "1 item left" when the active count is exactly 1, and "N items left" for all other counts (0, 2, 3, …).

#### Scenario: Singular label at exactly one item
**Given** the list has exactly 1 active todo
**When** the page renders
**Then** the footer shows "1 item left" with no trailing 's'

#### Scenario: Plural label at zero items
**Given** all todos are completed
**When** the page renders
**Then** the footer shows "0 items left" with trailing 's'

