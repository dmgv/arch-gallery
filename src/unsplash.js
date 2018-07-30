import Unsplash from "unsplash-js";

const unsplash = new Unsplash({
  applicationId:
    "efd484b440b57d735fc2c58372fe8171d557b0f5181b961b7ac7a9615cf13930",
  secret: "152302794c0a8fff6f9f70e4087edfd5801aef22f01721d59995841e0c3fc561",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
});

export { unsplash as default };
