# https://hub.docker.com/_/node/tags?page=1&name=bookworm-slim <- look for vulnerabilities
# https://github.com/primer/octicons/blob/main/package.json

FROM --platform=${TARGETPLATFORM} arm64v8/node:22.7.0-alpine3.20 AS build-stage

ARG TARGETPLATFORM TARGETOS TARGETARCH
ENV npm_config_cache=/usr/app/node_modules/.cache

WORKDIR /usr/app

COPY package*.json yarn.lock .yarnrc.yml .

RUN node -p "process.arch" \
    && echo $TARGETPLATFORM && echo $TARGETOS && echo $TARGETARCH
RUN corepack enable \
    && yarn config set --home enableTelemetry 0 \
    && yarn install --immutable --check-cache
# USER 1000:3000
# Error: EACCES: permission denied, mkdir '/usr/app/node_modules/.cache'
# RUN mkdir -p /usr/app/node_modules/.cache \
#     /usr/app/node_modules/.cache/babel-loader \
#     /usr/app/node_modules/.cache/eslint
# RUN mkdir -p /usr/app/.npm
# RUN npm config set cache /usr/app/.node_modules_cache --global

COPY . .

RUN yarn build

# RUN yarn add pm2
# RUN yarn run serveprod

# CMD ["npx", "yarn", "run", "serveprod"]
# RUN yarn add serve

FROM nginx:1.25.4-alpine3.18-slim AS production-stage
LABEL org.opencontainers.image.source=https://github.com/danroux/sk8l-ui
LABEL org.opencontainers.image.description="sk8l-ui image"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /app

ENV APP_PORT=8001
EXPOSE $APP_PORT
ENV PORT=$APP_PORT
ENV HOST=0.0.0.0

COPY --from=build-stage /usr/app/dist /app_tmp
# COPY nginx.conf /etc/nginx/nginx.conf

COPY ./run_app.sh /app_tmp
COPY ./replace-env-vars.sh /app_tmp

# STOPSIGNAL SIGQUIT
# RUN addgroup -g 1000 node \
#     && adduser -u 1000 -G node -s /bin/sh -D node
# nginx
RUN chown -R 101:101 /app /app_tmp
USER 101

# https://cli.vuejs.org/guide/deployment.html#docker-nginx
# CMD ["./run_app.sh", "&&", "npx", "serve", "-s", "dist"]
CMD ["./run_app.sh"]
