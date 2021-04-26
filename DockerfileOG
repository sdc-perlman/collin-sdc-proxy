FROM node:15-alpine as build

WORKDIR /app

COPY . .

RUN npm install

FROM nginx:stable-alpine

COPY --from=build /app/dist /var/www/static
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]