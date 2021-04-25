## Features
- Tells user
  - Per [meal, day, week]
    - Total kCal, remaining, macro %
  - Net kCal vs diet daily-target for 7 day trailing
- Maintains
  - User profile
  - History of meals
  - Repository of Ingredients (Ing)
- Technical requirements
  - Cloud based
  - MERN (MongoDb, E., Reactjs, Nodejs)
  - Possible Stack: Graphql, Apollo, Kubernetes, Docker, Helm, Jenkins/Travis, [Testing], Koltin app
- Possible "Tie-Ins"
  - Weight Tracking
  - Exercise Tracking
  - Shopping List and Budgets
    - Home Finance
      - Accounting
      - Investing
  - Pantry Tracking
    - Assets
    - Disaster Preparation
- Other thoughts
  - Who are the current competitors?
    - What do they offer (features)?
    - Are they opensource or commercial?
  - Where is the "Blue Ocean"?
    - Who is currently there?
    - What is their "Chasms"?

## Components
  1. AllFoodTable
    1. SearchFoods
      - foodName
      - [addNew]
        - Manual
        - ScanUPC
    1. Food
      - Name, Desc, [Edit]
  1. Meals
    1. QuickBites
      1. 1-5 premade mealTrans
        * replace from history 1to1
      1. addNew mealTrans
    1. mealTrans
      1. SearchFoods
      1. Meal
        * Date, Time, Location, Food[ { food, servings } ]
        * Action[ Save, Cancel ]
    1. mealHistory

## Schema

### Meal
Field | Type  | Options
--- | --- | ---
_id   | ObjectId  |
Date  | Date  | required
Time  | Time  | required
Location | String |
Food  | Array[FoodItem] |

#### FoodItem
Field | Type  | Options
--- | --- | ---
Food  | Object  | required
Servings  | Number  | required

### Food
Field | Type  | Options
----- | ----- | -----   
_id   | ObjectId  |
Name  | String  | required
Description   | String  |
kCal  | Number  | required
Macros

### User

```
  Field      |  Type        |  Options
  -----------------------------------------------
  _id        |  ObjectId    |
  name       |  String      |  required
  email      |  String      |  required, unique
  password   |  String      |  required
  avatarUrl  |  String      |
  role       |  String      |  required
  createdAt  |  Date        |
  updatedAt  |  Date        |
```

### Ingredient

```
  Field       |  Type        |  Options
  -----------------------------------------------
  _id         |  ObjectId    |
  name        |  String      |  required, unique
  kCal        |  String      |  required
  macros      |  array       |
  type        |  String      |  required
  ingredients |  array       |
  createdAt   |  Date        |
  updatedAt   |  Date        |
```


## API
