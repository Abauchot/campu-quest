const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    workboxOptions: {
        disableDevLogs : true,
    },
    fallbacks: {
        document: '/offline',
        image: '/offline',
        font: '/offline',
        other: '/offline',
    },
})
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPWA(nextConfig)
