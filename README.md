# Meal Tracker

[//]: # ({img})

DEMO: http://nutri.kameron.io

See [Specs document](https://github.com/normakster/meal-tracker-mern/blob/main/docs/Spec.md)

See [Backlog](https://github.com/normakster/meal-tracker-mern/blob/main/docs/Product%20Backlog.md)

### *Scope and status*
- Tracks food items from Grocery through Pantry to Consumption as Nutrients.

- Compares historic data to goals and/or guidelines to influence behavior.

- To facilitate nutritional awareness and answer the question "What should I eat right now".

- A Nutritional OKR system (objective and key result) for users and their advisers.

### *Warnings*
This project is currently incomplete
and for portfolio demonstration
purposes only.

### *Environmental variables*

```
NODE_ENV=development
APP_VERSION=
API_URL=
API_VERSION=
API_PORT=
MONGODB_URI=
FDA_KEY=
```

### *Deployment*
* This project is build to run in Docker Containers.

#### Local - Full
```
npm install
npm build
npm start
npm run open:[ mac || win ]
http://nutri.localhost
```

#### Local - Thin (w/o proxy or db)
```
npm run build:thin
npm run start:thin
npm run open:[ mac || win ]
```

#### Cluster
```
kubectl config use-context <context-to-YOUR-cluster>
helm install traefik traefik/traefik
kubectl apply -f ./kube/
http://nutri.[your_domain]
```

### *Call to action*
Please reach out and contribute if you find this project interesting.  

[//]: # (Socials: -  Discord)

### Socials
Github: [@normakster](https://github.com/normakster)  
