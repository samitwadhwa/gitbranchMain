/** @type {import('next').NextConfig} */
const nextConfig = {
    "output": "export",
    async rewrites() {
    return [
      {
        source: "/qrcode",
        destination: "/qrcodetour/qrcode",
      },
       {
        source: "/paymentlinkstart",
        destination: "/paymentlinks/paymentlinkstart",
      },
       {
        source: "/subscription",
        destination: "/subscriptiontour/subscription",
      },
       {
        source: "/route",
        destination: "/routetour/route",
      },
       {
        source: "/invoices",
        destination: "/invoicestour/invoices",
      },
      
    ];
  },
};

export default nextConfig;
