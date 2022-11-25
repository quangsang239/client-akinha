import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";
import axiosClient from "../api-client/axios-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => await axiosClient.get(url),
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />
      <ToastContainer />
    </SWRConfig>
  );
}
export default MyApp;
