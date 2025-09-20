import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {                                    // used component the Image in Next 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',                        //Api is used Based url
        port: '',
        pathname: '/**',                                       // any image 
        search: '',
      },
    ],
  },
};

export default nextConfig;
