FROM node:lts-bullseye AS base-nestjs-api-builder-image

WORKDIR /app
COPY . .

RUN npm install && npm run build

FROM node:lts-bullseye-slim AS base-nestjs-api-prod-image

WORKDIR /app
COPY package.json package-lock.json /app/

ENV NODE_ENV=production
RUN npm install --non-interactive --frozen-lockfile && npm cache clean

COPY --from=base-nestjs-api-builder-image /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "prod" ]