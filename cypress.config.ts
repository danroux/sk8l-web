// https://stackoverflow.com/questions/77092610/im-having-trouble-configuring-cypress-for-component-testing-on-my-vite-app
// https://github.com/cypress-io/cypress/discussions/28371
// https://www.npmjs.com/package/cypress-vite
// https://www.cypress.io/blog/2022/11/04/upcoming-changes-to-component-testing#vite-dev-server
// https://www.npmjs.com/package/@cypress/vite-dev-server

import { defineConfig, devServer } from 'cypress'

export default defineConfig({
  clientCertificates: [
    {
      url: 'https://sk8l-ui',
      ca: ['testdata/sk8l-certs/ca-cert.pem'],
      certs: [
         {
           cert: 'testdata/sk8l-certs/server-cert.pem',
           key: 'testdata/sk8l-certs/server-key.pem',
         },
       ],
    }
  ],
  e2e: {
    baseUrl: 'https://sk8l-ui:8001',
    supportFile: false,
    video: false,
    specPattern: [
      "cypress/**/*.spec.js"
    ]
  },
  component: {
      devServer(devServerConfig) {
          return devServer({
              ...devServerConfig,
              framework: 'vue',
              viteConfig: require('./vite.config.js')
          })
      }
  },
})
