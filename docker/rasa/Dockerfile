FROM rasa/rasa:3.1.0-full

# switch to root user to copy files
USER root

# copy local code to the container image.
WORKDIR /usr/src/app
COPY /rasa/. ./rasa

WORKDIR /usr/src/app/rasa
COPY /docker/rasa/endpoints.yml ./
RUN rasa train

# Run the web service on container startup.
ENTRYPOINT [ "rasa", "run", "-p 3001" ]
 