## Design

### Pages
1. About
1. Dashboard
  1. Charts
  1. Favorites
  1. Meal History
1. Pantry (list of current inventory)
  1. Scanner
    1. Food (has UPC)
  1. Cook (made from Leftovers)
    1. Food List (known/seen foods)
1. Profile

## ToDo

- Sever Render ? (image capture and search, data send via GraphQL)
- BarCode Scanner that references FDA/USAD api

1. Cook (Meal)
  - Prepare Meals OR Create Foods from other foods.
  - Meal Transaction (onSave -> pantry/add || meal/save)
    - Represents the IRL consumption of food. Similar to "Cook", but with transactional meta information.
