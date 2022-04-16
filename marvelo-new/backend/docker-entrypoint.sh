#!/bin/sh

# Build .env file if not created
if [ ! -f ./.env ]; then
    echo "NODE_ENV=${NODE_ENV}" > ./.env
    echo "HOST=${HOST}" >> ./.env
    echo "PORT=${PORT}" >> ./.env
    echo "DATABASE_CLIENT=${DATABASE_CLIENT}" >> ./.env
    echo "DATABASE_NAME=${DATABASE_NAME}" >> ./.env
    echo "DATABASE_HOST=${DATABASE_HOST}" >> ./.env
    echo "DATABASE_PORT=${DATABASE_PORT}" >> ./.env
    echo "DATABASE_USERNAME=${DATABASE_USERNAME}" >> ./.env
    echo "DATABASE_PASSWORD=${DATABASE_PASSWORD}" >> ./.env
    echo "DEV_ADMIN_ALLOW=${DEV_ADMIN_ALLOW}" >> ./.env
fi

# Start app
yarn start