## Why

Users need a way to focus on a subset of their todos without deleting items. Currently the list always shows everything, making it harder to work through active tasks or review completed ones.

## What Changes

- Add three filter buttons (All, Active, Completed) below the todo list
- The active filter is visually highlighted with an `.active` CSS class
- The render function filters the displayed list based on the active filter state
- Adding, completing, or deleting a todo respects the current filter in real time

## Capabilities

### New Capabilities
- `filter-by-status`: Allow users to filter the visible todo list by All, Active, or Completed status

### Modified Capabilities
- None — filtering is additive; existing add, toggle, and delete logic is unchanged

## Impact

- `todo-html-app-v6/src/index.html` — add filter buttons to markup, add filter state variable and filter logic to script
- No new dependencies
- No breaking changes to existing todo data structure or localStorage schema
