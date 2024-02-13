import { Cronjob } from './protoz/sk8l_connect.ts';
import { createCallbackClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

let sk8lApiURL = import.meta.env.VITE_SK8L_API_URL;

// A transport for clients using the Connect protocol with fetch()
const transport = createGrpcWebTransport({
  baseUrl: sk8lApiURL,
});

const Sk8lCronjobClient = createCallbackClient(Cronjob, transport);

export { Sk8lCronjobClient as default };
