// src/index.ts
import {Ray, ray} from "node-ray/web";
Ray.useDefaultSettings({
  remote_path: "webpack-internal:///(sc_server|sc_client|app-client)/.",
  local_path: process.env.LOCAL_PATH,
  sending_payload_callback: (instance, payloads) => {
    const match = payloads[0].data.origin.file.match(/webpack-internal:\/\/\/(?<type>rsc|ssr|sc_client|app-client)\/\./)
		if (!match) return
    switch (match.groups.type) {
      case "ssr":
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "label",
          content: { label: "SSR" },
          origin: payloads[0].data.origin
        }) });
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "color",
          content: { label: 'Server', color: "green" },
          origin: payloads[0].data.origin
        }) });
        break;
      case "sc_client":
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "label",
          content: { label: "Browser" },
          origin: payloads[0].data.origin
        }) });
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "color",
          content: { color: "orange" },
          origin: payloads[0].data.origin
        }) });
        break;
      case "app-client":
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "label",
          content: { label: "Browser" },
          origin: payloads[0].data.origin
        }) });
        payloads.push({ data: payloads[0].data, toArray: () => ({
          type: "color",
          content: { color: "blue" },
          origin: payloads[0].data.origin
        }) });
        break;
    }
  }
});
var src_default = ray;
export {
  src_default as default
};

//# debugId=B26B14CA75AA350F64756e2164756e21
