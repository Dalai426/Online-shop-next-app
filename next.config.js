/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        addDir:true,
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
}

module.exports = nextConfig
