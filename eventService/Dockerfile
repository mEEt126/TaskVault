# Dockerfile for Event Service
FROM node:14

# Create app directory
WORKDIR /usr/src/eventApp

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3003
CMD [ "node", "./src/server.js" ]
