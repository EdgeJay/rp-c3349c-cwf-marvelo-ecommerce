FROM node:14-alpine

WORKDIR /var/marvelo

COPY . ./
RUN yarn install
RUN yarn build
RUN chmod +x ./docker-entrypoint.sh

RUN apk --no-cache add curl

EXPOSE 1337
ENTRYPOINT ["./docker-entrypoint.sh"]
