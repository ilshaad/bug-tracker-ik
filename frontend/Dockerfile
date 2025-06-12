# create node & alpine
# FROM node:16.14.2-alpine3.15
# FROM node:18.7.0-alpine3.16
FROM node:24.0.2-alpine3.21
# FROM node:20-alpine

# set directory to work within
WORKDIR /bug-tracker-frontend-ik-202203

# copying both package.json & package-lock-json file
COPY ./package.json .
COPY ./package-lock.json .

# npm install, must have package-lock-json file to install successfully
# RUN npm ci
# RUN npm i
RUN npm ci --legacy-peer-deps

# copy all files over
COPY . .

# test file with jest & React-Testing-Library. But ensure test command is standout when finish, meaning not in --watch mode

# build
RUN npm run build

EXPOSE 3000

# CMD to start server. eg. node ./src/server.js
CMD npm run server