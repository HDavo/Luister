FROM node:14-alpine as build-step
	
WORKDIR /app/website

COPY package.json .

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:latest

COPY --from=build-step /app/website/dist/luister /usr/share/nginx/html

COPY nginx.conf /etc/nginx/

COPY default.conf /etc/nginx/conf.d/

COPY ./certs/* /usr/share/nginx/certificates/

CMD ["nginx", "-g", "daemon off;"]
