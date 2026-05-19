// Dev-only: proxies requests to the remote Forms Flow server to bypass browser
// CORS restrictions when running on localhost. Consumers using this package via
// CDN or npm on their own domain do not need this — their domain will be
// whitelisted on the Forms Flow server directly.
const { createProxyMiddleware } = require("http-proxy-middleware");

const TARGET = "https://forms-flow-web-qamulti.aot-technologies.com";

module.exports = function (app) {
  app.use(
    ["/formio", "/webapi"],
    createProxyMiddleware({
      target: TARGET,
      changeOrigin: true,
    })
  );

  // formio-react parses the src URL and internally re-requests the form using just
  // /form/<id>, dropping the /formio prefix. Without this block the dev server has
  // no handler for /form/... and returns a 404. pathRewrite restores the prefix
  // before forwarding, so the remote server receives the correct /formio/form/<id>.
  app.use(
    "/form",
    createProxyMiddleware({
      target: TARGET,
      changeOrigin: true,
      pathRewrite: { "^/form": "/formio/form" },
    })
  );
};
