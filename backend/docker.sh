# Dockerfile
# ! server working but .env file not working, therefore localhost psql also not working because of that
docker build -t ikbugtracker-backend . && \
docker run -p 4000:4000 ikbugtracker-backend
# docker run --env-file .env -p 4000:4000 ikbugtracker-backend

# docker-compose
# docker-compose up --build