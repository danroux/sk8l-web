# https://hub.docker.com/_/node/tags?page=1&name=bookworm-slim <- look for vulnerabilities
# https://github.com/primer/octicons/blob/main/package.json

FROM alpine:3.20 as build-stage
ENV npm_config_cache=/usr/app/node_modules/.cache
ENV V 20.5.1
ENV FILE node-v$V-linux-x64-musl.tar.xz

WORKDIR /usr/app
RUN apk add --no-cache libstdc++ \
    && apk add --no-cache --virtual .deps curl \
    && curl -fsSLO --compressed \
    "https://unofficial-builds.nodejs.org/download/release/v$V/$FILE" \
    && tar -xJf $FILE -C /usr/local --strip-components=1 \
    # ATTENTION!! --- maybe i want to remove this after all or add npm as a dep or sth. like that
    # && rm -f $FILE /usr/local/bin/npm /usr/local/bin/npx \
    # && rm -rf /usr/local/lib/node_modules \
    && apk del .deps

COPY package*.json yarn.lock .yarnrc.yml .

RUN corepack enable \
    && yarn config set --home enableTelemetry 0 \
    && yarn install
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

FROM nginx:1.25.4-alpine3.18-slim as production-stage
LABEL org.opencontainers.image.source=https://github.com/danroux/sk8l-ui
LABEL org.opencontainers.image.description="sk8l-ui image"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /app

ENV APP_PORT 8001
EXPOSE $APP_PORT
ENV PORT $APP_PORT
ENV HOST 0.0.0.0

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

# =========

# WORKDIR /usr/app
# RUN apt-get update \
#     && apt-get install -y git
# RUN git clone --depth=1 https://github.com/primer/octicons.git
# RUN npm install dependencies --save-dev
# RUN npm run build

# # docker cp sass:/usr/app/octicons/lib/build/data.json data.json
# CMD ["/bin/sh"]
