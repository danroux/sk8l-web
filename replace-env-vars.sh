#!/bin/sh

sed -i "s|VUE_APP_SK8L_API_URL|$VUE_APP_SK8L_API_URL|g" /app_tmp/js/app.*.js
sed -i "s|VUE_APP_SK8L_K8_NAMESPACE|$VUE_APP_SK8L_K8_NAMESPACE|g" /app_tmp/js/app.*.js

cp -r /app_tmp/* /app
