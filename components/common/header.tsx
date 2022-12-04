import Link from "next/link";
import { useEffect, useState } from "react";
export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const [user, setUser] = useState({
    userName: "",
    verified: false,
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(
        JSON.parse(
          localStorage.getItem("user") ||
            JSON.stringify({
              userName: "",
              verified: false,
              name: "",
              phoneNumber: "",
            })
        )
      );
    }
  }, []);
  return (
    <div className="fixed top-0 w-[100%] h-[72px] bg-white z-50">
      <div className="w-[90%] mx-auto flex justify-between items-center my-[10px]">
        <Link href="/">
          <h1 className="text-main-color hover:cursor-pointer hover:opacity-70">
            akinha
          </h1>
        </Link>
        <div className="flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.0}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          {user?.name ? (
            <Link href="/profile">
              <span className="text-xl select-none hover:cursor-pointer hover:opacity-70">
                {user?.userName}
              </span>
            </Link>
          ) : (
            <Link href="/login">
              <span className="text-xl select-none hover:cursor-pointer hover:opacity-70">
                Đăng nhập
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
