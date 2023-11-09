const {CronjobClient} = require('./protos/sk8l_grpc_web_pb.js');

let sk8lApiURL = process.env.VUE_APP_SK8L_API_URL;

const Sk8lCronjobClient = new CronjobClient(sk8lApiURL, null, null);

export { Sk8lCronjobClient as default };
