# estágio de compilação
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --loglevel notice
COPY . .
RUN npm run build

# estágio de produção
FROM nginx:stable-alpine as production-stage

# Add nginx config
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]