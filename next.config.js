/** @type {import('next').NextConfig} */
// const nextConfig = {}

module.exports = {
    reactStrictMode: true,
    images:{
        // domains: ['freelogopng.com', 'freelogopng.com/images/all_img/'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'freelogopng.com',
              port: '',
              pathname: '/images/all_img/**',
            },
          ],
    },
    experimental: {
        // appDir: true, 
    },
};