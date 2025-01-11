import type { NextConfig } from "next";

import autoCert from 'anchor-pki/auto-cert/integrations/next'

const withAutoCert = autoCert({
  enabledEnv: 'development',
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default withAutoCert(nextConfig)




