## Possible "Tie-Ins"
  1. Weight Tracking
  1. Exercise Tracking
  1. Shopping List and Budgets
  1. Pantry Tracking
  1. Home Finance
    - Accounting
    - Investing
    - Assets
    - Disaster Preparation

## Other thoughts
  - Who are the current competitors?
    - What do they offer (features)?
    - Are they opensource or commercial?
  - Where is the "Blue Ocean"?
    - Who is currently there?
    - What is their "Chasms"?

## Technical requirements
  - Cloud based [Kubernetes, Docker, Helm, Jenkins]
  - Infrastructure [Traefik, Nginx, AWS, Linode]
  - MERN [MongoDb, Express, Reactjs, Nodejs]
  - Possible Stack: Graphql, Apollo, TravisCI, Jest, Cypress, Koltin app [Scanner]

  - Route 53 -> EC2 -> Kubernetes -> Ingress (Traefik via Helm) -> React App (via Nginx) -> API (Express) -> MongoDB (via Mongoose)
