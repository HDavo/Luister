FROM php:latest

RUN mkdir -p /app/webapi

WORKDIR /app/webapi

COPY . .

RUN docker-php-ext-install pdo_mysql

CMD ["php", "-S", "0.0.0.0:4000"]
