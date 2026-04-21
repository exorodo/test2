## Why

Users have no way to tell at a glance how much work remains. A visible count of active (incomplete) todos provides immediate feedback and reduces cognitive load.

## What Changes

- A footer element is added to the app displaying the count of incomplete todos
- The count updates live on every state change (add, delete, toggle)
- The label uses correct singular/plural ("1 item left" vs "2 items left")

## Capabilities

### New Capabilities
- `remaining-count`: Displays a live count of active (incomplete) todos in a footer row, with correct singular/plural grammar

### Modified Capabilities

## Impact

- `src/index.html` — HTML footer element, CSS for footer styling, updated `render()` function
