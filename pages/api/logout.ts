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
  if (req.method !== "POST") {
    return res.status(400).json({ name: "Method not supported" });
  }
  const cookies = new Cookies(req, res);
  cookies.set("token");
  res.status(200).json({ message: "logout success" });
}
