// @ts-check
/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
  env: {
    PUBLIC_URL: "/",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  reactStrictMode: true,
  basePath: "",
  trailingSlash: false,
  images: {
    domains: [
      "atsur-registry-artifacts-dev.s3.eu-north-1.amazonaws.com",
      "localhost",
      "admin.atsur.art",
      "registry.atsur.art",
      "images.unsplash.com",
    ],
  },
};
