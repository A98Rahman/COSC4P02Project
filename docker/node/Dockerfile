# building on the official node package was causing issues
FROM python:3.7-slim

# install node, npm and ffmpeg
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt install -y nodejs
RUN apt install -y npm
RUN apt install -y ffmpeg

WORKDIR /usr/src/app
COPY /server/. ./server

WORKDIR /usr/src/app/server
RUN npm install

CMD [ "node", "index", "--RASA_PREFIX=http://rasa-service:3001/", "--PORT=80" ]
