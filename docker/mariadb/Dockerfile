FROM mariadb:10.7.3

USER mysql

WORKDIR /usr/src/app

COPY /database/. /docker-entrypoint-initdb.d

RUN chown -R mysql /var/lib/mysql
RUN chgrp -R mysql /var/lib/mysql


