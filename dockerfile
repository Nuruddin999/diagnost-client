FROM node:14

# set working directory
WORKDIR /usr/src/client

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN yarn

# add app
COPY . .

# start app
CMD ["npm", "run", "start"]