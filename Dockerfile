# FROM node:18.16.0-alpine3.18

# WORKDIR /usr/app
# # COPY main.go /usr/app
# RUN npm install -g sass
# RUN npm install --save @primer/css
# RUN sass --load-path=node_modules node_modules/@primer/css:/usr/app/here/stylesheets

# CMD ["/bin/sh"]

# https://hub.docker.com/_/node/tags?page=1&name=bookworm-slim <- look for vulnerabilities
# https://github.com/primer/octicons/blob/main/package.json
FROM node:20.5.1-bookworm-slim AS deps

WORKDIR /srv
COPY package*.json yarn.lock .yarnrc.yml .
# # COPY node_modules .
# # USER 1000:3000
# RUN npm install -g npm@10.2.2
# # RUN npm ci --only=production
# RUN npm install # needed to install ./node_modules/.bin/vue-cli-service
# # RUN npm ci --omit=dev
# # RUN npm ci

RUN corepack enable \
    && yarn install \
    && yarn config set --home enableTelemetry 0
# # COPY package.json yarn.lock ./
# # RUN yarn install --production

FROM alpine:3.18.3 AS release
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
# RUN npm install -g npm@10.2.2

COPY --from=deps /srv/node_modules ./node_modules
COPY --from=deps /srv/package*.json /srv/yarn.lock /srv/.yarnrc.yml .

RUN corepack enable \
    && yarn install \
    && yarn config set --home enableTelemetry 0
# USER 1000:3000
# Error: EACCES: permission denied, mkdir '/usr/app/node_modules/.cache'
# RUN mkdir -p /usr/app/node_modules/.cache \
#     /usr/app/node_modules/.cache/babel-loader \
#     /usr/app/node_modules/.cache/eslint
# RUN mkdir -p /usr/app/.npm
# RUN npm config set cache /usr/app/.node_modules_cache --global

COPY . .
EXPOSE 8001
ENV HOST 0.0.0.0
ENV PORT 8001

CMD [ "npx", "yarn", "serve" ]
# CMD [ "npx", "serve", "-s", "dist", "--ssl-key", "/etc/sk8l-certs/server-key.pem", "--ssl-cert", "/etc/sk8l-certs/server-cert.pem" ]

# https://cli.vuejs.org/guide/deployment.html#docker-nginx

# =========

# WORKDIR /usr/app
# RUN apt-get update \
#     && apt-get install -y git
# RUN git clone --depth=1 https://github.com/primer/octicons.git
# RUN npm install dependencies --save-dev
# RUN npm run build

# # docker cp sass:/usr/app/octicons/lib/build/data.json data.json
# CMD ["/bin/sh"]
