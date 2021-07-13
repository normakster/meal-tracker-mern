# Meal Tracker

[//]: # ({img})

DEMO: http://nutri.kameron.io

See [Specs document](https://github.com/normakster/meal-tracker-mern/blob/main/docs/Spec.md)

### *Scope and status*
- A Nutritional OKR system (objective and key result) for users and their advisers.

- To facilitate nutritional awareness and answer the question "What should I eat right now".

- Tracks from Grocery through Pantry to Consumption and Nutrients.

- Compares historic data to goals and/or guidelines to influence behavior.

### *Warnings*
This project is currently incomplete
and for portfolio demonstration
purposes only.

[//]: # (
### *Environmental variables*

```
N/A atm.
```
)

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

Socials: -  Discord
