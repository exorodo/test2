# filter-by-status

Allows users to view a subset of their todo list by selecting All, Active, or Completed.

## Requirements

- Three filter buttons are always visible: All, Active, Completed
- Exactly one filter is active at a time; the active button has an `.active` CSS class
- Default filter on load is All
- Filter state is in memory only — resets to All on page reload
- The rendered list reflects only items matching the current filter
- The todo counter (if present) always reflects total active (incomplete) items regardless of filter

## Scenarios

**Given** todos exist with mixed statuses
**When** the user clicks Active
**Then** only incomplete todos are shown

**Given** todos exist with mixed statuses
**When** the user clicks Completed
**Then** only completed todos are shown

**Given** any filter is active
**When** the user clicks All
**Then** all todos are shown

**Given** the Active filter is selected
**When** the user adds a new todo
**Then** the new todo appears immediately (new todos are always incomplete)

**Given** the Completed filter is selected
**When** the user adds a new todo
**Then** the new todo does not appear (new todos are incomplete, not matching Completed)

**Given** the Active filter is selected
**When** the user marks a todo as complete
**Then** it disappears from the list

**Given** the Completed filter is selected
**When** the user marks a todo as complete
**Then** it remains visible

**Given** the Active filter is selected
**When** the user deletes an active todo
**Then** it is removed from the list
