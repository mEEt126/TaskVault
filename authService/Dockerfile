# Dockerfile for Auth Service
FROM node:14

# Create app directory
WORKDIR /usr/src/authApp

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "./src/index.js" ]
