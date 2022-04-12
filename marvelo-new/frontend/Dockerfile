FROM node:14-alpine

WORKDIR /var/marvelo

COPY . ./
RUN yarn install

EXPOSE 3000
CMD ["yarn", "develop"]
