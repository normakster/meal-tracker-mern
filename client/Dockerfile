# Build
FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
# Have a .dockerignore file ignoring node_modules and build
COPY . ./
RUN npm run build

# Production
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
