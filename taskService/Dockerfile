# Dockerfile for Task Service
FROM node:14

# Create app directory
WORKDIR /usr/src/taskApp

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3002
CMD [ "node", "./src/server.js" ]
