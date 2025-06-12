docker build -t ikbugtrackerbackend2025 . && \
docker login && \
docker tag ikbugtrackerbackend2025:latest rechadsalma/ikbugtrackerbackend2025 && \
docker push rechadsalma/ikbugtrackerbackend2025 && \
heroku container:login && \
heroku create -a bug-tracker-backend-ik-202203 && \
heroku container:push web -a bug-tracker-backend-ik-202203 && \
heroku container:release web -a bug-tracker-backend-ik-202203 

