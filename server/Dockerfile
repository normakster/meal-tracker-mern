FROM node:alpine

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package*.json ./
RUN npm install --production

COPY . /opt/app

ENV PORT 8081

EXPOSE 8081
ENTRYPOINT [ "npm", "start" ]
