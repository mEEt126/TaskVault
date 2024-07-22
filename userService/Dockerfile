# Dockerfile for User Service
FROM node:14

# Create app directory
WORKDIR /usr/src/userApp

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "node", "./src/server.js" ]
