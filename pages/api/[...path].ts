import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

const proxy = httpProxy.createProxyServer();
export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve) => {
    // convert Cookies
    const cookies = new Cookies(req, res);
    const token = cookies.get("token");
    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    req.headers.cookie = "";
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
  // res.status(200).json({ name: "name" });
}
