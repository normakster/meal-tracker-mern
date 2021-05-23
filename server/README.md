## Enviornmental Variables (.env)

~~MONGODB_URI=~~

~~REACT_APP_API_URL=~~

## API Mapping

URI | Action | Request | Response
--- | --- | --- | ---
/api/ | n/a | - | n/a |
/api/meals/ | GET | - | [meals]
/api/meals/ | POST | {meal} | {meal}

URI | Action | Request | Response
--- | --- | --- | ---
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
