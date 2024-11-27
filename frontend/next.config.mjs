// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     webpack: (config, { isServer }) => {
//       if (!isServer) {
//         config.cache = false;
//       }
//       return config;
//     },
//   };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.cache = false;
  //   }
  //   return config;
  // },
  env: {
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path* ` 
      }
    ];
  }
};


export default nextConfig;