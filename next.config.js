/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  env: {
    TOKEN_MAP: process.env.TOKEN_MAP,
    API_URL: process.env.API_URL,
    FIREBASE_CONFIG: {
      apiKey: process.env.FIREBASE_CONFIG_APIKEY,
      authDomain: process.env.FIREBASE_CONFIG_AUTHDOMAIN,
      projectId: process.env.FIREBASE_CONFIG_PROJECTID,
      storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
      appId: process.env.FIREBASE_CONFIG_APPID,
    },
    PASSWORD_ADMIN: process.env.PASSWORD_ADMIN,
    USERNAME_ADMIN: process.env.USERNAME_ADMIN,
    TOKEN_ADMIN: process.env.TOKEN_ADMIN,
  },
};

module.exports = nextConfig;
