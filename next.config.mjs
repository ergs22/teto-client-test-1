import { config } from "dotenv";
config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DOMAINMAIL: process.env.DOMAINMAIL,
    RASA_URL: process.env.RASA_URL,
  },
};

export default nextConfig;
