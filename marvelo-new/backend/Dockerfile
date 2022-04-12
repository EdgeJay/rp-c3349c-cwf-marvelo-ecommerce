FROM node:14-alpine

WORKDIR /var/marvelo

COPY . ./
RUN yarn install
CMD ["npx", "strapi", "develop"]
