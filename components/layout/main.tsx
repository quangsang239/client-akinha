import { motion } from "framer-motion";
import { useState } from "react";
import ReactMapGL from "react-map-gl";

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
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxAccessToken={MAP_TOKEN_API}
      ></ReactMapGL>
    </motion.div>
  );
}
