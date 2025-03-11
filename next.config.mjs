/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clement2004.blob.core.windows.net",
        port: "", // No port needed for standard HTTPS
        pathname: "/techutsav25/**", // Allow all images in this container
      },
    ],
  },
};

export default nextConfig;
