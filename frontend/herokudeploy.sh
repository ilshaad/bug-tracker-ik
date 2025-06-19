docker build -t ikbugtrackerfrontend2025 . && \
docker login && \
docker tag ikbugtrackerfrontend2025:latest rechadsalma/ikbugtrackerfrontend2025  && \
docker push rechadsalma/ikbugtrackerfrontend2025  && \
heroku container:login && \
heroku create -a bug-tracker-frontend-ik-202203 && \
heroku container:push web -a bug-tracker-frontend-ik-202203 && \
heroku container:release web -a bug-tracker-frontend-ik-202203

# docker build -t ikbugtrackerfrontend2025 -f Dockerfile.dev . && \
# docker login && \
# docker tag ikbugtrackerfrontend2025:latest rechadsalma/ikbugtrackerfrontend2025  && \
# docker push rechadsalma/ikbugtrackerfrontend2025  && \
# heroku container:login && \
# heroku create -a bug-tracker-frontend-ik-202203 && \
# heroku container:push web -a bug-tracker-frontend-ik-202203 && \
# heroku container:release web -a bug-tracker-frontend-ik-202203 

