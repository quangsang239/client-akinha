import * as React from "react";

export interface ILoadingProps {}

export function Loading(props: ILoadingProps) {
  return (
    <div className="fixed w-screen h-screen bg-loading-page bg-no-repeat bg-center"></div>
  );
}
