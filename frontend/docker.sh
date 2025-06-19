# Dockerfile.dev works for local developement, but not for Dockerfile because that only works for deployement (Render) due to env setup
docker build -t fe1 . && \
# docker build -t fe1 -f Dockerfile.dev . && \
docker run -p 3000:3000 fe1
# docker run -p 3000:3000 fe1

# touch .env && \

# echo iKworking && \

# printenv && \

# echo $(DOMAIN_AUTH0) && \

# printenv >> .env && \

# cat .env && \

# echo second working

# printenv DOMAIN_AUTH0 >> .env && \

# printenv CLIENT_ID_AUTH0 >> .env && \

# printenv TESTINGENV >> .env && \

# echo iKshowing && \

# printenv pwd && \

# echo ikpath && \

# printenv DOMAIN_AUTH0 && \

# printenv CLIENT_ID_AUTH0 && \

# printenv TESTINGENV