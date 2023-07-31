/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fastly.picsum.photos",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "grapes.fra1.digitaloceanspaces.com"
            },
            {
                protocol: "http",
                hostname: "localhost",
            }
        ],
    },
};

module.exports = nextConfig;
