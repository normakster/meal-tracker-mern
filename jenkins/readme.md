# Pipeline

1. Git -> Docker
1. Docker -> new version
  - Pull from Git
  - Build [DB, API, Client, Client-Local]
    - docker build -f ./db/dockerfile -t normak458/meal-tracker_mongo ./db
    - docker build -f ./server/Dockerfile -t normak458/meal-tracker_api ./server
    - docker build -f ./client/Dockerfile -t normak458/meal-tracker_client ./client
    - docker build -f ./client/Dockerfile_without-NGINX -t normak458/meal-tracker_client_local ./client
  - Tag - docker tag [source:tag] [target:tag]
  - Push - docker push [image:tag]
1. Kube -> Blue version
  - Provision Infrastructure
    - Hardware (Instances)
    - Cluster
  - Deploy
    - Reverse Proxy
    - Routers
    - Services
    - Deployment
  - Check
    - Health Checks
    - Log Files
1. Kube -> Switch Router from Green to Blue

## Continuous Integration / Deployment / Delivery

1. Unit Tests
1. Platform Tests
1. Deliver to Staging
1. Acceptance Tests
1. Deploy to Production (Manual || Blue--Green)
1. Post Deploy Scripts

## Threads

- Git
  - Main (Stable)
  - Edge (Buggy)
  - Branches (PR to Edge then Main)
- Docker
  - LTS (x.X)
  - Edge (x.x.X)
- Kube
  - Blue (LTS)
  - Green (Edge)
