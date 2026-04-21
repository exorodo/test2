# filter-by-status

Allows users to view a subset of their todo list by selecting All, Active, or Completed.

## ADDED Requirements

### Requirement: The app MUST display three filter buttons (All, Active, Completed) and render only todos matching the active filter

The filter bar SHALL always be visible. Exactly one filter SHALL be active at a time, indicated by an `.active` CSS class. The default filter on load SHALL be All. Filter state is held in memory and resets to All on page reload.

#### Scenario: Active filter shows incomplete todos
**Given** todos exist with mixed statuses
**When** the user clicks Active
**Then** only incomplete todos are shown

#### Scenario: Completed filter shows completed todos
**Given** todos exist with mixed statuses
**When** the user clicks Completed
**Then** only completed todos are shown

#### Scenario: All filter shows everything
**Given** any filter is active
**When** the user clicks All
**Then** all todos are shown

#### Scenario: New todo appears under Active filter
**Given** the Active filter is selected
**When** the user adds a new todo
**Then** the new todo appears immediately

#### Scenario: New todo hidden under Completed filter
**Given** the Completed filter is selected
**When** the user adds a new todo
**Then** the new todo does not appear

#### Scenario: Completing a todo removes it from Active view
**Given** the Active filter is selected
**When** the user marks a todo as complete
**Then** it disappears from the list

#### Scenario: Completing a todo keeps it in Completed view
**Given** the Completed filter is selected
**When** the user marks a todo as complete
**Then** it remains visible

#### Scenario: Deleting a todo removes it from Active view
**Given** the Active filter is selected
**When** the user deletes an active todo
**Then** it is removed from the list
