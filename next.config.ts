/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "", // <- Bardzo ważne, musi pasować do nazwy repozytorium
  assetPrefix: "", // <- Bardzo ważne, musi pasować do nazwy repozytorium
  // output: "export",
};

module.exports = nextConfig;
