import { motion } from "framer-motion";
import ReactMapGL from "react-map-gl";

import { LayoutProps } from "../../models";
import Search from "./search";

export function MainLayout(props: LayoutProps) {
  return (
    <motion.div
      className=" w-screen h-screen overflow-hidden relative"
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
    >
      <Search />
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
