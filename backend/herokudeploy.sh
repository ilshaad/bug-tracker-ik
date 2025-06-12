docker build -t ikbugtrackerbackend2025 . && \
docker login && \
docker tag ikbugtrackerbackend2025:latest rechadkheerdali/ikbugtrackerbackend2025 && \
docker push rechadkheerdali/ikbugtrackerbackend2025 && \
heroku container: login && \
heroku create -a ikbugtrackerbackend2025app && \
heroku container:push web -a 