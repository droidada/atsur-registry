// @ts-check
const config = require("./src/data/config.json");
/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  basePath: config.site.base_path !== "/" ? config.site.base_path : "",
  trailingSlash: config.site.trailing_slash,
  images: {
    domains: [
      "directus-admin-service-mr73ptziua-uc.a.run.app",
      "admin.atsur.art",
      "registry.atsur.art",
      "images.unsplash.com",
    ],
  },
};
