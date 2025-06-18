# create node & alpine
# FROM node:16.14.2-alpine3.15
# FROM node:18.7.0-alpine3.16
FROM node:24.0.2-alpine3.21
# FROM node:20-alpine

# set directory to work within
WORKDIR /bug-tracker-backend-ik-202203

# Declare the build-time variables that Railway will provide.
# ARG FRONTEND_RAILWAY_SITE_URL
# ARG DATABASE_URL
# ARG LOCAL_PROD_URL
# ARG NODE_ENV

# # Set these as environment variables with exactly the same names as your setup with your app & railway env dashboard.
# ENV FRONTEND_RAILWAY_SITE_URL=${FRONTEND_RAILWAY_SITE_URL} \
#     DATABASE_URL=${DATABASE_URL} \
#     LOCAL_PROD_URL=${LOCAL_PROD_URL} \
#     BACKEND_URL=${BACKEND_URL} 

# # For debugging purposes, you can echo the variables (optional)
# RUN echo "DOMAIN_AUTH0: $DOMAIN_AUTH0" && \
#     echo "DATABASE_URL: $DATABASE_URL" && \
#     echo "LOCAL_PROD_URL: $LOCAL_PROD_URL" && \
#     echo "BACKEND_URL: $BACKEND_URL" 

# Echo the Node.js version for confirmation during build
RUN echo "Node.js version: $(node -v)"

# copying both package.json & package-lock-json file
COPY ./package.json .
# COPY ./package-lock.json .

# npm install, must have package-lock-json file to install successfully
# RUN npm ci
RUN npm i

# copy all files over
COPY . .

# test file with jest & React-Testing-Library. But ensure test command is standout when finish, meaning not in --watch mode
# RUN echo 'IK TESTING' && npm run testout

# build
# RUN npm run build

# EXPOSE 4000

# CMD to start server. eg. node ./src/server.js
CMD npm run server
