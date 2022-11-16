/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    TOKEN_MAP:
      "pk.eyJ1IjoiY2Z0bmloIiwiYSI6ImNsNjdzZnB5bzNudTQzYm1wa21mbXo2emEifQ.SDqggkiy2bskCxRu4dYYkA",
    API_URL: "http://localhost:1305",
  },
};

module.exports = nextConfig;
