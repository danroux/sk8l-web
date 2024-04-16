import { defineConfig } from 'cypress'

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
  }
})