/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "books.google.com",
        port: "",
        pathname: "/books/content/**",
      },
      {
        protocol: "https",
        hostname: "avataaars.io",  // Add this for avataaars
        port: "",
        pathname: "/**",  // Allow all paths
      },
    ],
  },
};

export default nextConfig;
