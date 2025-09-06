// next.config.mjs
import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // add other config options if needed
}

export default withContentlayer(nextConfig)
