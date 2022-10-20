import { motion } from "framer-motion";
import ReactMapGL from "react-map-gl";

import { LayoutProps } from "../../models";
import { FaSearchLocation } from "react-icons/fa";
export function MainLayout(props: LayoutProps) {
  return (
    <motion.div
      className=" w-screen h-screen overflow-hidden relative"
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
    >
      <button className="w-12 h-12 absolute bg-white z-10 top-5 left-1/2 -translate-x-1/2 rounded-lg border-solid border-black border-2">
        <FaSearchLocation className="w-8 h-8 text-rose-500 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer" />
      </button>
      <ReactMapGL
        initialViewState={{
          latitude: 10.801607983756918,
          longitude: 106.66400649270845,
          zoom: 16,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxAccessToken="pk.eyJ1IjoiY2Z0bmloIiwiYSI6ImNsNjdzZnB5bzNudTQzYm1wa21mbXo2emEifQ.SDqggkiy2bskCxRu4dYYkA"
      ></ReactMapGL>
    </motion.div>
  );
}
