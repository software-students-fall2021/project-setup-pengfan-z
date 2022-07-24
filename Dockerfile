# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python3 g++ make
WORKDIR /project-setup-pengfan-z
COPY . .
RUN yarn install --production
CMD ["node", "front-end/src/App.js"]