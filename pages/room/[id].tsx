import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import * as _ from "lodash";

import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import useSWR from "swr";
import { CreateNewRoomPayload } from "../../models";
import NotFoundPage from "../../components/layout/not-found-page";
import { Loading } from "../../components/common/loading";

export interface IRoomProps {}

export default function Room(props: IRoomProps) {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState<CreateNewRoomPayload | null>();
  const [date, setDate] = useState<any>();
  const [imageFirst, setImageFirst] = useState<any>();
  const [image, setImage] = useState<string[][]>([]);
  const { data } = useSWR(`/room/get-room/${id}`);
  console.log(data);
  useEffect(() => {
    if (data?.data) {
      let room: CreateNewRoomPayload = data?.data.result;
      setRoom(room);
      setImageFirst(room?.imageRoom[0]);
      if (room.imageRoom.length % 2 === 0) {
        room.imageRoom.push(room.imageRoom[0]);
      }
      const newListImage = _.chunk(_.drop(room?.imageRoom), 2);
      setImage(newListImage);
      const getDate = new Date(room?.createAt || Date.now());
      setDate(
        `${getDate.getDate()}-${getDate.getMonth()}-${getDate.getFullYear()}`
      );
    }
  }, [data]);
  console.log({ imageFirst, image });
  if (room) {
    return (
      <div>
        <Header />
        {room ? (
          <div className="bg-slate-100 relative pt-[100px] pb-[30px]">
            <div className="w-[90%] mx-auto text-lg">
              <div className="rounded-[20px] overflow-hidden">
                <div className="flex relative overflow-x-scroll scroll-bar-image">
                  <div className="min-w-[50%] w-[50%] h-[500px] relative">
                    <Image alt="" layout="fill" src={imageFirst} />
                  </div>

                  {image.map((result, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col min-w-[25%] w-[25%] h-[500px] relative"
                      >
                        <div className="min-w-[100%] w-[100%] h-[50%] relative">
                          <Image alt="" layout="fill" src={result[0]} />
                        </div>
                        <div className="min-w-[100%] w-[100%] h-[50%] relative">
                          <Image alt="" layout="fill" src={result[1]} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-[30px]">
                <h2>{room?.addressRoom}</h2>
              </div>
              <div className="flex justify-between mt-[30px]">
                <div className="w-[65%] bg-white rounded-[20px] px-[30px]">
                  <div className="flex items-center mt-[20px] bg-slate-100 w-fit px-[20px] py-[10px] rounded-[20px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-main-color"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>

                    <p className="ml-[10px] text-2xl font-bold">
                      Thông tin phòng
                    </p>
                  </div>
                  <div className="flex flex-wrap pb-[20px]">
                    <div className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>Giá phòng</p>
                      <p>
                        {room?.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        đồng
                      </p>
                    </div>
                    <div className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>Diện tích</p>
                      <p>
                        {room?.area
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        Mét vuông
                      </p>
                    </div>
                    <div className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>Đặt cọc</p>
                      <p>
                        {room?.deposit
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        đồng
                      </p>
                    </div>
                    <div className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>Sức chứa</p>
                      <p>
                        {room?.aop
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        Người
                      </p>
                    </div>
                    <div className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>Tiền điện</p>
                      <p>
                        {room?.electricity
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        đồng
                      </p>
                    </div>
                    <div className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>Tiền Nước</p>
                      <p>
                        {room?.water
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        đồng
                      </p>
                    </div>
                    <div className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>Trạng thái</p>
                      {room?.stateRoom ? (
                        <p className="text-green-500">Còn phòng</p>
                      ) : (
                        <p className="text-red-500">hết phòng</p>
                      )}
                    </div>

                    <div className="min-w-[100%] w-[100%] mt-[20px]">
                      <p>Địa chỉ</p>
                      <p>{room?.addressRoom}</p>
                    </div>
                  </div>
                </div>
                <div className="w-[30%] h-fit bg-white rounded-[20px] pb-[20px]">
                  <div className="flex items-center ml-[30px] my-[20px] bg-slate-100 w-fit px-[20px] py-[10px] rounded-[20px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.0}
                      stroke="currentColor"
                      className="w-10 h-10 text-main-color"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>

                    <p className="ml-[10px] text-2xl font-bold">
                      Thông tin chủ phòng
                    </p>
                  </div>
                  <div className="flex justify-between mx-[30px] text-xl">
                    <div className="">
                      <p>Tạ Quang Sang</p>
                      <p>0919984976</p>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.0}
                        stroke="currentColor"
                        className="w-10 h-10 rotate-90"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Ngày đăng</p>
                      <p>{date}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[65%] bg-white rounded-[20px] px-[30px] py-[20px] mt-[30px]">
                <div className="flex items-center mt-[20px] bg-slate-100 w-fit px-[20px] py-[10px] rounded-[20px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-main-color"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>

                  <p className="ml-[10px] text-2xl font-bold">Tiện ích</p>
                </div>
                <div className="flex flex-wrap pb-[20px]">
                  {room?.utilities.map((values, index) => (
                    <div key={index} className="min-w-[25%] w-[25%] mt-[20px]">
                      <p>{values}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotFoundPage />
        )}
        <Footer />
      </div>
    );
  } else {
    return <Loading />;
  }
}
