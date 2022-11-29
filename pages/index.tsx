import type { NextPage } from "next";

import Footer from "../components/common/footer";
import { MainLayout } from "../components/layout";

const Home: NextPage = () => {
  return (
    <div>
      <MainLayout />
      <Footer />
    </div>
  );
};

export default Home;
