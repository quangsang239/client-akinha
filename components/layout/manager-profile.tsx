import { useState } from "react";
import { useRouter } from "next/router";

import { authApi } from "../../api-client";
import ManagerRoom from "./manager-room";
import NewPassword from "./new-password";
import Profile from "./profile";

export interface IManagerProfileProps {
  setIsAddRoom: (isAddRoom: boolean) => void;
  user: {
    name: string;
    verified: boolean;
    userName: string;
    phoneNumber: string;
  };
}

export default function ManagerProfile({
  setIsAddRoom,
  user,
}: IManagerProfileProps) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex w-[90%] justify-between mx-auto pt-[100px] pb-[30px]">
        <div className="w-[20%] h-fit bg-white rounded-[10px] overflow-hidden mr-[20px] text-text-main">
          <div className="">
            <div
              className="px-[30px] flex items-center text-xl py-[20px] border-b-2 hover:bg-blue-500 hover:cursor-pointer hover:text-white"
              onClick={() => setPage(1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.0}
                stroke="currentColor"
                className="w-8 h-8 mr-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <span className="select-none">Quản lí thông tin</span>
            </div>
            <div
              className="px-[30px] flex items-center text-xl py-[20px] border-b-2 hover:bg-blue-500 hover:cursor-pointer hover:text-white"
              onClick={() => setPage(2)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.0}
                stroke="currentColor"
                className="w-8 h-8 mr-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="select-none">Quản lí phòng trọ</span>
            </div>
            <div
              className="px-[30px] flex items-center text-xl py-[20px] border-b-2 hover:bg-blue-500 hover:cursor-pointer hover:text-white"
              onClick={() => setPage(3)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.0}
                stroke="currentColor"
                className="w-8 h-8 mr-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>

              <span className="select-none">Đổi mật khẩu</span>
            </div>
            <div
              className="px-[30px] flex items-center text-xl py-[20px] border-b-2 hover:bg-blue-500 hover:cursor-pointer hover:text-white"
              onClick={() => {
                authApi.logout();
                localStorage.removeItem("user");
                router.push("/login");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mr-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>

              <span className="select-none">Đăng xuất</span>
            </div>
          </div>
        </div>
        {page === 1 ? (
          <Profile user={user} />
        ) : page === 2 ? (
          <ManagerRoom setIsAddRoom={setIsAddRoom} user={user} />
        ) : (
          <NewPassword user={user} />
        )}

        {/*  */}
        {/* <NewPassword /> */}
      </div>
    </div>
  );
}
