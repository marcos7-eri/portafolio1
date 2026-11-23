const api=process.env.API_INTERNAL_URL||'http://localhost:3001';
export default {output:'standalone',async rewrites(){return[{source:'/api/:path*',destination:`${api}/api/:path*`}]}};
