/** @type {import('next').NextConfig} */
const { withKeystone } = require("@keystone-6/core/next");

module.exports = withKeystone({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
});
