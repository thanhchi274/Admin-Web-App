FROM node:14-slim
# Create app directory
WORKDIR /usr/src/app

COPY package.json  ./
COPY ./yarn.lock ./

RUN yarn install
COPY . .
# Install app dependencies

EXPOSE 5000

CMD [ "yarn", "start" ]