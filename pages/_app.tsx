import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";
import axiosClient from "../api-client/axios-client";
import "mapbox-gl/dist/mapbox-gl.css";
import Seo from "../components/common/seo";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => await axiosClient.get(url),
        shouldRetryOnError: false,
      }}
    >
      <Seo
        data={{
          title: "akinha",
          description:
            "akinha website tìm kiếm và cho thuê phòng trọ miễn phí cho học sinh sinh viên",
          url: "https://client-akinha.vercel.app",
          thumbnailUrl: "/favicon.ico",
        }}
      />
      <Component {...pageProps} />
      <ToastContainer />
    </SWRConfig>
  );
}
export default MyApp;
