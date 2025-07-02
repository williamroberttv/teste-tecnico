FROM node:22-alpine3.21 AS build

WORKDIR /api

COPY . .

RUN npm install
RUN npm run build

ENV NODE_ENV=production

FROM node:22-alpine3.21 AS production

WORKDIR /api

COPY --chown=node:node --from=build /api/dist ./dist
COPY --chown=node:node --from=build /api/node_modules ./node_modules

EXPOSE 3333

CMD ["sh", "-c", " node dist/main"]
