import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillFacebook, AiFillGithub } from "react-icons/ai";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <div className="bg-white w-full h-[300px]">
      <div className="w-[90%] m-auto flex justify-between mt-[30px] border-b-2">
        <div className="">
          <h2 className="font-bold text-6xl text-main-color mb-[30px]">
            akinha
          </h2>
          <p className="font-bold">
            Website tìm kiếm kiếm phòng trọ miễn phí, <br />
            Và sẽ luôn như vậy
          </p>
          <p className="font-bold mt-[10px]">Tác giả: quangsang</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="font-bold text-main-color">
            Ứng dụng đang phát triển
          </h4>
          <div className="w-[200px] h-[150px] relative">
            <Image src="/images/images.png" alt="" layout="fill" />
          </div>
        </div>
      </div>
      <div className="flex justify-center text-6xl mt-[30px]">
        <AiFillFacebook />
        <AiFillGithub />
      </div>
    </div>
  );
}
