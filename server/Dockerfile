FROM node:alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package*.json ./
RUN npm ci --silent

COPY . /opt/app

#ENV NODE_ENV production
#ENV PORT 8081

#EXPOSE 8081
ENTRYPOINT [ "npm", "start" ]
