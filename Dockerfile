FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon db-migrate db-migrate-pg

# Install app dependencies
RUN rm -rf node_modules
RUN npm install
#RUN npm rebuild node-sass

# Bundle app source
COPY . .

# Install app migrations
#RUN npm run db:up


EXPOSE 5000

CMD npm run db:up; npm run start
