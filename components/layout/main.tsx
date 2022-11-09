import { motion } from "framer-motion";
import { useState } from "react";
import ReactMapGL from "react-map-gl";
import Link from "next/link";

import { MAP_TOKEN_API } from "../../config/config";
import { LayoutProps, MapParameter } from "../../models";
import Search from "./search";

export function MainLayout(props: LayoutProps) {
  const [viewState, setViewState] = useState<MapParameter>({
    latitude: 10.801607983756918,
    longitude: 106.66400649270845,
    zoom: 15,
  });
  return (
    <motion.div
      className=" w-screen h-screen overflow-hidden relative"
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
    >
      <Search setViewState={setViewState} />
      <Link href="/home">
        <button className="absolute bg-pink-500  w-[40px] h-[40px] right-6 z-10 duration-1000 top-3 ease-in overflow-hidden rounded-[999px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.0}
            stroke="currentColor"
            className="w-7 h-7 text-white mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
      </Link>
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxAccessToken={MAP_TOKEN_API}
      ></ReactMapGL>
    </motion.div>
  );
}
