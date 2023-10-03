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
        NEXTAUTH_SECRET:"dalai",
        CLOUD_NAME:"dcseiq7vs",
        CLOUDINARY_API_KEY:"382584871384374",
        CLOUDINARY_API_SECRET:"Wxv_dZESX8lkLmThb4-2jim3ImM"
    },
}

module.exports = nextConfig
