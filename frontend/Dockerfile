# create node & alpine
FROM node:16.14.2-alpine3.15

# set directory to work within
WORKDIR /bug-tracker-frontend-ik-202203

# ENV DOMAIN_AUTH0=${GDOMAIN_AUTH0}
# ENV CLIENT_ID_AUTH0=${GCLIENT_ID_AUTH0}
# ENV TESTINGENV=${GTESTINGENV}
# ENV TESTINGENV=0774842
# ENV IKDOCK=yoyo

# copying both package.json & package-lock-json file
COPY ./package.json .
COPY ./package-lock.json .

# RUN echo ${TESTINGENV}

RUN touch .env 

# RUN echo DOMAIN_AUTH0=${DOMAIN_AUTH0}} >> .env

# RUN echo CLIENT_ID_AUTH0=${CLIENT_ID_AUTH0} >> .env

# RUN echo TESTINGENV=${TESTINGENV} >> .env

# RUN printenv TESTINGENV

RUN echo iktesting

RUN printenv >> .env

RUN printenv

# npm install, must have package-lock-json file to install successfully
RUN npm ci

# copy all files over
COPY . .

# test file with jest & React-Testing-Library. But ensure test command is standout when finish, meaning not in --watch mode
# RUN echo 'IK TESTING' && npm run testout
# RUN touch .env 
# && echo ${DOMAIN_AUTH0} >> .env && echo ${CLIENT_ID_AUTH0} >> .env && echo ${TESTINGENV} >> .env && echo iKshowing && echo ${DOMAIN_AUTH0} && echo ${CLIENT_ID_AUTH0} && echo ${TESTINGENV} 

# RUN source ./test.sh

# build
RUN npm run build

EXPOSE 3000

# CMD to start server. eg. node ./src/server.js
CMD npm run server