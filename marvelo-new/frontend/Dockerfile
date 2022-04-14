FROM node:14-alpine

WORKDIR /var/marvelo

COPY . ./
RUN yarn install
RUN echo "NEXT_STRAPI_UPLOADS_URL=$NEXT_STRAPI_UPLOADS_URL"

EXPOSE 3000
CMD ["yarn", "develop"]
