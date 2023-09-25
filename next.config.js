/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        addDir:true,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
    env: {
        API_URL: "http://localhost:3000",
        NEXTAUTH_SECRET:"dalai"
    },
}

module.exports = nextConfig
