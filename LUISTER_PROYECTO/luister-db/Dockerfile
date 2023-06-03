FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=Lu1st3r

COPY luister.sql /docker-entrypoint-initdb.d/

VOLUME /var/lib/mysql

CMD ["mysqld"]
