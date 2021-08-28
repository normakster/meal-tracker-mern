# Build
FROM node:alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# Production
FROM nginx:alpine

ARG SITE
COPY --from=build /app/build /usr/share/nginx/html${SITE}
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
