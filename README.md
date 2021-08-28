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
N/A atm.
```

### *Deployment*

#### Local
```
cd meal-tracker-mern
cd ./server
npm ci --silent
cd ../client
npm ci --silent
cd ../compose
docker-compose up --build
http://nutri.localhost
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
