# deploy your app to heroku with all these commands
docker build -t ikbugtrackerbackend2025 . && \
docker login && \
docker tag ikbugtrackerbackend2025:latest rechadsalma/ikbugtrackerbackend2025 && \
docker push rechadsalma/ikbugtrackerbackend2025 && \
heroku container:login && \
# you will need to manually enter the below commands in the terminal
heroku create -a bug-tracker-backend-ik-202203 && \
heroku container:push web -a bug-tracker-backend-ik-202203 && \
heroku container:release web -a bug-tracker-backend-ik-202203 

