import * as React from "react";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import NotFound from "../components/layout/not-found";

export interface INotFoundPageProps {}

export default function NotFoundPage(props: INotFoundPageProps) {
  return (
    <div>
      <Header />
      <NotFound />
      <Footer />
    </div>
  );
}
