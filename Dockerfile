FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon babel-cli db-migrate db-migrate-pg

# Install app dependencies
RUN rm -rf node_modules
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000