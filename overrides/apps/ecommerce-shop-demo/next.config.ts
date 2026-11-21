import type { NextConfig } from "next";
const config: NextConfig={
  output:"standalone",
  poweredByHeader:false,
  reactStrictMode:true,
  typedRoutes:false,
  images:{formats:["image/webp"],unoptimized:true},
  async redirects(){
    return [{source:"/categoria/bdsm",destination:"/categoria/jogos-acessorios",permanent:true}];
  },
  async headers(){
    return [{source:"/:path*",headers:[
      {key:"X-Content-Type-Options",value:"nosniff"},
      {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
      {key:"X-Frame-Options",value:"DENY"},
      {key:"Permissions-Policy",value:"camera=(),microphone=(),geolocation=(),payment=()"}
    ]}];
  }
};
export default config;
