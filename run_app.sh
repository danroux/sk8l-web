#!/bin/sh

# set -e

sed -i "s|VUE_APP_SK8L_API_URL|$VUE_APP_SK8L_API_URL|g" /app/js/app.*.js
sed -i "s|VUE_APP_SK8L_K8_NAMESPACE|$VUE_APP_SK8L_K8_NAMESPACE|g" /app/js/app.*.js

nginx -g 'daemon off;'
