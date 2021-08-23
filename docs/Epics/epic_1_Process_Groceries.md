# Process Groceries

## Epic
As a User, I want add my groceries to my panty.

## User Stories
As a User, I want:
1. To enter new Non-UPC items into inventory manually via a form.
1. To search past known items and 1-click add.
1. Manually enter a UPC.
1. Scan a UPC.
1. Search UPC API and USDA for nutrient info.
1. Add to inventory.


1. To see a table of my current inventory with a quantity greater than zero.
1. To modify inventory items.
  - Edit quantity by direct, +/-, additive.
  - Trash items.

## Wireframe / Elements
1. UPC Search Choice Section
  1. UPC input
  1. Scan button -> starts camera process.
  1. Manual Entry button
1. Results Section
  1. UPC search results
  1. Non-UPC Entry Form
  1. Found Item Details
1. Confirmation Section

## Acceptance Criteria
1. Renders
  - all sections from elements list. (multiple tests)
  - can display UPC search results
  - can display Item's details
1. Outputs
  - should return search result from manual UPC input.
  - should return search result from scanner process.
  - should accept manually enter for Non-UPC item details
1. States
  - result should have TBD variables. (multiple tests)
  - similar to: "Food Item" = USDA Nutrient info + UPC #number and Brand info.
1. Events
  - can start scanner sub-process.
  - confirmation cancel aborts commit and returns to editing.
  - confirmation adds item to inventory.
1. Edge
  - should inform on malformed UPC number.
  - should require manual input for missing result info.
