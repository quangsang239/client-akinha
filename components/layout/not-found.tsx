import * as React from "react";
import Image from "next/image";
export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  return (
    <div className="w-full mt-[30px] h-[100%] bg-white relative">
      <h1 className="text-main-color text-center">
        Không tìm thấy thông tin phòng!
      </h1>
      <div className="relative w-full h-[750px] mt-[50px]">
        <Image layout="fill" alt="" src="/images/not-found.webp" />
      </div>
    </div>
  );
}
