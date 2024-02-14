// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
const path = require("path");
const fs = require('fs');
export default defineConfig({
  plugins: [
    vue(),
    viteCommonjs()
  ],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      // exclude: [ 'node_modules/lodash-es/**', 'node_modules/@types/lodash-es/**', ]
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8001,
    https: {
      key: fs.readFileSync('/etc/sk8l-certs/server-key.pem'),
      cert: fs.readFileSync('/etc/sk8l-certs/server-cert.pem'),
    }
  },
  resolve: {
    alias: {
      preserveSymlinks: true,
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
