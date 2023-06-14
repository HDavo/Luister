FROM php:apache

WORKDIR /var/www/html

COPY . .

RUN docker-php-ext-install mysqli pdo_mysql

RUN echo "ServerName luister.es" >> /etc/apache2/apache2.conf

COPY ./certs/cert.pem /etc/ssl/certs/ssl_certificate.crt

COPY ./certs/key.pem /etc/ssl/private/ssl_private_key.key

RUN a2enmod ssl

RUN a2enmod headers

COPY ./httpd.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 7000

EXPOSE 443

CMD ["apache2-foreground"]
