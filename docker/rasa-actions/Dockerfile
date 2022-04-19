FROM mariadb:10.7.3

# python and mariadb stuff
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install -y python3.7
RUN apt-get install -y python3-pip
RUN apt-get install -y libmariadb3 libmariadb-dev

# install rasa and mariadb packages
RUN pip3 install pip
RUN pip3 install mariadb
RUN python3 -m pip install rasa

# copy actions files to image
WORKDIR /usr/src/app
COPY /rasa/actions/. ./rasa/actions

WORKDIR /usr/src/app/rasa/actions

ENV RUNNING_IN_DOCKER_CONTAINER Yes

CMD [ "rasa", "run", "actions", "-p 5055", "--verbose" ]
