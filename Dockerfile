# FROM node:18.16.0-alpine3.18

# WORKDIR /usr/app
# # COPY main.go /usr/app
# RUN npm install -g sass
# RUN npm install --save @primer/css
# RUN sass --load-path=node_modules node_modules/@primer/css:/usr/app/here/stylesheets

# CMD ["/bin/sh"]

# https://hub.docker.com/_/node/tags?page=1&name=bookworm-slim <- look for vulnerabilities
# https://github.com/primer/octicons/blob/main/package.json
FROM node:22.9.0-bookworm-slim AS deps
# FROM arm32v7/node:22.2.0-bookworm-slim AS deps

RUN groupadd --system --gid 101 nginx \
    && useradd --system --gid nginx --create-home --home /home/nginx --comment "nginx user" --shell /bin/bash --uid 101 nginx \
    && chown -R 101:101 /home/nginx

WORKDIR /home/nginx
ENV npm_config_cache=/home/nginx/node_modules/.cache
COPY package*.json yarn.lock .yarnrc.yml .
# # COPY node_modules .
# # USER 1000:3000
# RUN npm install -g npm@10.2.2
# # RUN npm ci --only=production
# RUN npm install # needed to install ./node_modules/.bin/vue-cli-service
# # RUN npm ci --omit=dev
# # RUN npm ci

# USER 101

# $(pwd)/bin
# corepack enable --install-directory ~/bin \

RUN node -p "process.arch" \
    && echo $TARGETPLATFORM && echo $TARGETOS && echo $TARGETARCH
RUN mkdir -p $(pwd)/node_modules/.cache  \
    && corepack enable \
    && yarn config set --home enableTelemetry 0 \
    && yarn install

# # COPY package.json yarn.lock ./
# # RUN yarn install --production

FROM alpine:3.20 AS release

LABEL org.opencontainers.image.source=https://github.com/danroux/sk8l-ui
LABEL org.opencontainers.image.description="sk8l-ui dev image"
LABEL org.opencontainers.image.licenses=MIT

ARG TARGETPLATFORM TARGETOS TARGETARCH
ENV npm_config_cache=/usr/app/node_modules/.cache
# https://unofficial-builds.nodejs.org/download/release/v21.7.3/
ENV V=20.14.0
# ENV FILE node-v$V-linux-x64-musl.tar.xz
WORKDIR /usr/app

RUN if [ "$TARGETPLATFORM" = "linux/amd64" ]; then FILE=x64-musl; elif [ "$TARGETPLATFORM" = "linux/arm/v8" ]; then FILE=armv6l; elif [ "$TARGETPLATFORM" = "linux/arm64" ]; then FILE=armv6l; else FILE=x64-musl; fi \
    && apk add --no-cache libstdc++ \
    && apk add --no-cache --virtual .deps curl \
    && curl -fsSLO --compressed \
    "https://unofficial-builds.nodejs.org/download/release/v$V/node-v$V-linux-$FILE.tar.xz" \
    && tar -xJf node-v$V-linux-$FILE.tar.xz -C /usr/local --strip-components=1 \
    # ATTENTION!! --- maybe i want to remove this after all or add npm as a dep or sth. like that
    # && rm -f $FILE /usr/local/bin/npm /usr/local/bin/npx \
    # && rm -rf /usr/local/lib/node_modules \
    && apk del .deps \
    && rm node-v$V-linux-$FILE.tar.xz
# RUN npm install -g npm@10.4.0

# not actually needed locally, but to keep initContainer command working
RUN mkdir -p /app_tmp/ \
    && echo "#!/bin/sh" > /app_tmp/replace-env-vars.sh \
    && chmod +x /app_tmp/replace-env-vars.sh

RUN addgroup -g 101 nginx \
    && adduser -u 101 -G nginx -s /bin/sh -D nginx

RUN chown -R 101:101 $(pwd)

COPY --chown=101:101 --from=deps /home/nginx/node_modules/ ./node_modules
COPY --chown=101:101 --from=deps /home/nginx/package*.json /home/nginx/yarn.lock /home/nginx/.yarnrc.yml .

RUN corepack enable \
    && yarn config set --home enableTelemetry 0 \
    && yarn install
# RUN npm config set cache /usr/app/.node_modules_cache --global

RUN chown -R 101:101 $(pwd)/.yarn

COPY --chown=101:101 . .

EXPOSE 8001
ENV HOST=0.0.0.0
ENV PORT=8001
USER 101

CMD [ "npx", "yarn", "dev" ]
# CMD [ "npx", "serve", "-s", "dist", "--ssl-key", "/etc/sk8l-certs/server-key.pem", "--ssl-cert", "/etc/sk8l-certs/server-cert.pem" ]

# https://cli.vuejs.org/guide/deployment.html#docker-nginx
