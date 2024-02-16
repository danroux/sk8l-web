#!/bin/sh

sed -i "s|VITE_SK8L_API_URL|$VITE_SK8L_API_URL|g" /app_tmp/assets/index-*.js
sed -i "s|VITE_SK8L_K8_NAMESPACE|$VITE_SK8L_K8_NAMESPACE|g" /app_tmp/assets/index-*.js

cp -r /app_tmp/* /app
