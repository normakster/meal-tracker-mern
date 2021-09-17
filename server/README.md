### Enviornmental Variables (.env)

```
NODE_ENV=
API_VERSION=
API_URL=
API_PORT=
MONGODB_URI=
FDA_KEY=
```

### API Mapping

URI | Action | Request | Response
--- | --- | --- | ---
/api/ | n/a | - | n/a
---
/api/health | GET | - | JSON
---
/api/meals/ | GET | - | [meals]
/api/meals/ | POST | {meal} | {meal}
---
/api/foods/ | GET | - | [foods]
/api/foods/ | POST | {food} | {foods}
/api/foods/:id | GET | - | {foods}
/api/foods/:id | PUT | {food} | {foods}
/api/foods/:id | DELETE | - | {foods}
---
/api/pantry/ | GET | - | [inventory]
/api/pantry/ | POST | {inventory} | {inventory}
/api/pantry/:id | GET | - | {inventory}
/api/pantry/:id | PUT | {inventory} | {inventory}
/api/pantry/:id | DELETE | - | {deleted: inventor._id}
---
/api/upc/ | GET | - | {msg,[inventory]}
/api/upc/ | POST | {inventory} | {_id,msg,inventory}
/api/upc/:id | GET | - | {_id,msg,inventory}
/api/upc/:id | PUT | {inventory} | {_id,msg,inventory}
/api/upc/:id | DELETE | - | {_id,msg,emptyInventory}
/api/upc/search | POST | {query} | {totalHits,[foods]}, {[foods.empty]}


### Schemas

#### Pantry (Inventory)
```
{
  quantity: { type: Number, required: true },
  food: { type: foodData.schema, required: false },
}
```

#### Food (foodData)
```
{
  upc: { type: String, required: false },
  description: { type: String, required: false },
  brandOwner: { type: String, required: false },
  dataSource: { type: String, required: false },
  brandedFoodCategory: { type: String, required: false },
  ingredients: { type: String, required: false },
  servingSize: { type: String, required: false },
  servingSizeUnit: { type: String, required: false },
  labelNutrients: {
    fat: { type: String, required: false },
    saturatedFat: { type: String, required: false },
    transFat: { type: String, required: false },
    cholesterol: { type: String, required: false },
    sodium: { type: String, required: false },
    carbohydrates: { type: String, required: false },
    fiber: { type: String, required: false },
    sugars: { type: String, required: false },
    protein: { type: String, required: false },
    calcium: { type: String, required: false },
    iron: { type: String, required: false },
    potassium: { type: String, required: false },
    addedSugar: { type: String, required: false },
    calories: { type: String, required: false },
  },
  dataType: { type: String, required: false },
}
```

#### Meals
```
{
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  ingredients: [{
    serv: { type: Number, required: true },
    food: { type: foodSchema, required: true },
  }],
}
```

#### Foods
```
{
  name: { type: String, required: true },
  desc: { type: String, required: true },
  kCal: { type: Number, required: true },
  fat: { type: Number, required: true },
  protien: { type: Number, required: true },
  carb: { type: Number, required: true },
}
```
