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
      {
        protocol: "https",
        hostname: "clement2004.blob.core.windows.net",
        port: "", // No port needed for standard HTTPS
        pathname: "/techutsav26/**", // Allow all images in techutsav26 container
      },
    ],
  },
};

export default nextConfig;
