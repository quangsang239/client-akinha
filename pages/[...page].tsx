import * as React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import NotFoundPage from "../components/layout/not-found-page";
export interface IOutSitePageProps {}

export default function OutSitePage(props: IOutSitePageProps) {
  return (
    <div>
      <Header />
      <NotFoundPage />
      <Footer />
    </div>
  );
}
