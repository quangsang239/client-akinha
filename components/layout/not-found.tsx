import * as React from "react";
import Image from "next/image";
export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  return (
    <div className="w-full mt-[30px] h-[600px] bg-black relative">
      <Image layout="fill" alt="" src="/images/not-found.webp" />
    </div>
  );
}
