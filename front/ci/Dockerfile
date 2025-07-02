FROM node:22-alpine3.21 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration=production

FROM nginx:alpine AS production
COPY --from=build /app/dist/front/browser /app/

ADD ./ci/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
EXPOSE 80

