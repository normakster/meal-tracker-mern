# Meal Tracker

[//]: # ({img})

Route 53 -> EC2 -> Kubernetes -> Ingress (Traefik via Helm) -> React App (via Nginx) -> API (Express) -> MongoDB (via Mongoose)

DEMO: nutri.kameron.io

## *Scope and status*

[//]: # (TODO: Scope and status)
The point is to visualize your nutritional intake to better advise future behavior.

This project is currently incomplete and for demonstration purposes only.

## *Wants / Features*

- Tells user
  - Per [meal, day, week]
    - Total kCal, remaining, macro %
  - Net kCal vs diet daily-target for 7 day trailing
  - Displays Line Graphs, Pie Charts
  - Suggests meals from history to "patch" nutrient needs.
- Maintains
  - User profile
  - History of meals
  - Inventory of food on hand
  - Repository of past ingredients
  - List of typical "Quick Bites"
- Technical requirements
  - Cloud based [Kubernetes, Docker, Helm, Jenkins]
  - Infrastructure [Traefik, Nginx, AWS]
  - MERN [MongoDb, Express, Reactjs, Nodejs]
  - Possible Stack: Graphql, Apollo, TravisCI, Jest, Cypress, Koltin app [Scanner]
- Possible "Tie-Ins"
  1. Weight Tracking
  1. Exercise Tracking
  1. Shopping List and Budgets
  1. Pantry Tracking
  1. Home Finance
    - Accounting
    - Investing
    - Assets
    - Disaster Preparation
- Other thoughts
  - Who are the current competitors?
    - What do they offer (features)?
    - Are they opensource or commercial?
  - Where is the "Blue Ocean"?
    - Who is currently there?
    - What is their "Chasms"?

## *Warnings*

[//]: # (TODO: Warnings)
- Decide on a license
- No Security
  - Needs:
    - Better CORS
    - UI Sign in
      - Auth Token (Passport.js ??)
    - API needs token access
    - API needs Regex validation on inputs
    - Database needs external access and Role based management
- UI Design
  - Needs flow management
  - Accessibility considerations
  - CSS Skinning and Animations
- Database
  - Needs to be moved to MongoAtlas or cloud provided.
  - Needs replication and backups.
- API Server
  - Move off Express to a Serverless or GraphQL option?
  - Change env variables for uniformed deployment.
  - keep trying DB connect on disconnect / error.
- Local Docker-Compose
  - Test
  - Refine Dockerfiles
- Kube deployment
  - DNS addon for service to service name resolution? (probably)
  - Blue/Green deployment
  - Prod/Dev Env
  - Dashboard
  - Metric (Prometheus)

### *Call to action*

[//]: # (TODO: Call to action)

Please reach out and contribute if you find this project interesting.  

### *Environmental variables*

[//]: # (TODO: Environmental variables)
```
- N/A atm.
```

### *Deployment*

[//]: # (TODO: Deployment)

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
```
