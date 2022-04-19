FROM node:14-alpine

WORKDIR /var/marvelo

COPY . ./
RUN echo "NEXT_PUBLIC_STRAPI_UPLOADS_URL=${NEXT_PUBLIC_STRAPI_UPLOADS_URL}"
RUN touch .env.development.local
RUN echo "NEXT_PUBLIC_STRAPI_UPLOADS_URL=${NEXT_PUBLIC_STRAPI_UPLOADS_URL}" > .env.development.local
RUN yarn install

RUN apk --no-cache add curl

EXPOSE 3000
CMD ["yarn", "develop"]
