import httpProxy, { ProxyResCallback } from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

const proxy = httpProxy.createProxyServer();
export const config = {
  api: {
    bodyParser: false,
  },
};
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(400).json({ name: "Method not supported" });
  }

  return new Promise((resolve) => {
    req.headers.cookie = "";
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", (chunk) => {
        body += chunk;
      });
      proxyRes.on("end", () => {
        try {
          const { accessToken, expireAt, verified, userName, message, code } =
            JSON.parse(body);
          //convert cookies
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("token", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(expireAt),
          });

          (res as NextApiResponse)
            .status(200)
            .json({ message, code, verified, userName });

          //
        } catch (error) {
          (res as NextApiResponse)
            .status(200)
            .json({ message: "Error!", error: error });
        }
        resolve(true);
      });
    };
    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
  // res.status(200).json({ name: "name" });
}
