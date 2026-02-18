/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clement2004.blob.core.windows.net",
        port: "",
        pathname: "/techutsav25/**",
      },
    ],
  },
};

export default nextConfig;
