/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'c7.alamy.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com', // Removed the protocol part
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com', 
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', 
        pathname: '/**', // Matches all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
        pathname: '/**', // Matches all paths under the domain
      },


    ],
  },
};

export default nextConfig;