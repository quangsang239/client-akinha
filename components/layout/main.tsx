import { motion } from "framer-motion";
import ReactMapGL from "react-map-gl";

import { LayoutProps } from "../../models";

export function MainLayout(props: LayoutProps) {
  return (
    <motion.div
      className=" w-screen h-screen overflow-hidden"
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
    >
      <ReactMapGL
        initialViewState={{
          latitude: 21.0244246,
          longitude: 105.7938072,
          zoom: 16,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxAccessToken="pk.eyJ1IjoiY2Z0bmloIiwiYSI6ImNsNjdzZnB5bzNudTQzYm1wa21mbXo2emEifQ.SDqggkiy2bskCxRu4dYYkA"
      ></ReactMapGL>
    </motion.div>
  );
}
