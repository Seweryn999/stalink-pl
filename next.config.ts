/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/stalink-pl", // <- Bardzo ważne, musi pasować do nazwy repozytorium
  assetPrefix: "/stalink-pl/", // <- Bardzo ważne, musi pasować do nazwy repozytorium
  output: "export", // <- To musi być dodane, aby utworzyć folder `out`
};

module.exports = nextConfig;
