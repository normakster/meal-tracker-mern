# Process Groceries

## Epic
As a User, I want to add my groceries to my panty.

## User Stories
As a User, I want:
1. To Scan a UPC with a phone camera.
1. To manually enter a UPC || search term.
1. To choose from a list of past/known items and 1-click add.
1. To choose from a list, if none were found or chosen, from a search of UPC / USDA/FDA API and 1-click add.
1. To accept into inventory with a quantity.
1. To enter new Non-UPC based items into inventory manually via a form.
1. To see a table of current inventory with a quantities greater than zero.
1. To manage the inventory (pantry).

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
