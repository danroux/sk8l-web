const fs = require('fs');
const path = require('path');
const fileDep = path.resolve(__dirname, 'sk8l_api_url.txt');

var xx = require('webpack');

const { defineConfig } = require('@vue/cli-service');

const getRuntimeEnvData = () => {
    // const newEnv = dotenv.config({
    //   path: envPath,
    // });

    // return JSON.stringify(newEnv.parsed);
    // sed -i  "s|https://sk8l:9080|$VITE_SK8L_API_URL|g" app.*.js
    return `https://sk8l:9080`;
};

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        port: "8000",
        host: "0.0.0.0",
        https: false,
        host: "a6a25bbaf55dd4593a7bd94dbec58074-1700497628.eu-west-1.elb.amazonaws.com",
        allowedHosts: 'all',
        https: {
            // key: fs.readFileSync('/etc/sk8l-certs/server-key.pem'),
            // cert: fs.readFileSync('/etc/sk8l-certs/server-cert.pem'),
            // ca: fs.readFileSync('/etc/sk8l-certs/ca-cert.pem'),
        },
    },
    outputDir: "dist",
    chainWebpack: config => {
        config.module
            .rule('js')
            .exclude
            .add('/usr/app/node_modules')
            .add('/usr/app/src/components/protos/')
            .add('/usr/app/src/components/protoz/')
            .end()
            .use('babel-loader')
            .loader('/usr/app/node_modules/babel-loader/lib/index.js')
            .tap(options => {
                // modify the options...
                options.cacheCompression = false;
                options.cacheDirectory =  false;
                options.cacheIdentifier = 'nopppexxx';

                return options
            });

        config.plugin("define").tap(args => {
            let _base = args[0]["process.env"];

            args[0]["process.env.VITE_SK8L_K8_NAMESPACE"] = JSON.stringify("VITE_SK8L_K8_NAMESPACE");
            args[0]["process.env.VITE_SK8L_API_URL"] = JSON.stringify("VITE_SK8L_API_URL");
                // xx.DefinePlugin.runtimeValue(getRuntimeEnvData, {
                //     fileDependencies: [JSON.stringify(fileDep)],
                // });

            return args;
        });
    },
    configureWebpack: {
        // if (process.env.NODE_ENV === 'production') {
        //       // mutate config for production...
        //     } else {
        //       // mutate for development...
        //     }
        plugins: [
            // new xx.EnvironmentPlugin(['NODE_ENV', 'BASE_URL', "VITE_SK8L_API_URL"]),
            // new xx.DefinePlugin({
            //     'process.env.VITE_SK8L_API_URL': xx.DefinePlugin.runtimeValue(getRuntimeEnvData, true),
            // }),

            // new xx.DefinePlugin({
            //     'process.env.VITE_SK8L_API_URL': xx.DefinePlugin.runtimeValue(getRuntimeEnvData, {
            //         fileDependencies: [fileDep],
            //     }),
            // }),
        ],
        module: {
            rules: [
                {
                    test: /\.m?jsx?$/,
                    exclude: [
                        '/usr/app/node_modules/',
                        '/usr/app/src/components/protos/',
                        '/usr/app/src/components/protoz/',
                    ],
                    use: [
                        /* config.module.rule('js').use('babel-loader') */
                        {
                            loader: '/usr/app/node_modules/babel-loader/lib/index.js',
                            options: {
                                cacheCompression: false,
                                cacheDirectory: false,
                                cacheIdentifier: 'nopppexxx'
                            }
                        }
                    ]
                }
            ]
        },
  }
});
