## Design

### Objects
1. Dashboard
1. Meal
1. Food
1. Profile
1. Pantry
1. About
1. Scanner

### Pages
1. Pantry
  - Current Inventory of Foods.
1. Food List
  - List of Known Foods.
1. Food
  - Food Profile
1. Cook
  - Prepare Meals OR Create Foods from other foods.
  - Meal Transaction (onSave -> pantry/add || meal/save)
    - Represents the IRL consumption of food. Similar to "Cook", but with transactional meta information.

## ToDo

- Change env variables for uniformed deployment.
- Add decorators as Action callers to a reducer (biz logi).
- Fix imports to "Import <Item> from 'pkg/item'" to reduce amount of data sent to client.
- Move away from Create-React-App.
- React-Bootstrap
- Redux ?? (not yet)
- Dumb Down components to hold only their state.
- HOC for passing "Meal,Dispatch"
- Simplify reducers.
- Flatten api/service
- Sever Render ? (image capture and search, data send via GraphQL)
- SEO
- Logo
- BarCode Scanner that references FDA/USAD api
