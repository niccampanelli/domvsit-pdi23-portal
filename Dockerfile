FROM node:20.11-alpine AS build

WORKDIR /app/portal

COPY ["package.json", "./"]

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve", "dist", "-s", "-l", "3000"]