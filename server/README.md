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


## Schemas

### Meals
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

### Foods
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
