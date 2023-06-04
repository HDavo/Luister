FROM php:latest

RUN mkdir -p /app/altwebapi

WORKDIR /app/altwebapi

COPY . .

VOLUME /app/altwebapi/images

RUN docker-php-ext-install pdo_mysql

CMD ["php", "-S", "0.0.0.0:4000"]
