# Build
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL
ARG REACT_APP_VERSION
ENV REACT_APP_VERSION $REACT_APP_VERSION
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
