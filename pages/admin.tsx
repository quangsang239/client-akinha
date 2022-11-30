import { useState, useEffect } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CreateNewRoomPayload, RegisterPayload } from "../models";
import { authApi } from "../api-client";
import Image from "next/image";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/config";
export interface IAdminProps {}

export default function Admin(props: IAdminProps) {
  const router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState(1);
  const [allUser, setAllUser] = useState<RegisterPayload[]>([]);
  const [allRoom, setAllRoom] = useState<CreateNewRoomPayload[]>([]);
  const [editUser, setEditUser] = useState<RegisterPayload | null>(null);
  const [editRoom, setEditRoom] = useState<CreateNewRoomPayload | null>(null);
  const { data: users, mutate: mutateUser } = useSWR(`/user/get-all-user`);
  const { data: rooms, mutate: mutateRoom } = useSWR(`/room/get-all`);

  console.log(users);
  const handleDeleteUser = () => {
    toast.promise(
      async () => {
        await authApi
          .deleteUser(
            editUser?._id ? editUser._id : "",
            process.env.TOKEN_ADMIN ? process.env.TOKEN_ADMIN : ""
          )
          .then(() => {
            setEditUser(null);
            mutateUser();
            // setPage(1);
          });
      },
      {
        pending: "Đang xoá người dùng",
        success: "Xoá người dùng thành công",
        error: "Xoá người dùng thất bại",
      },
      {
        position: "top-center",
      }
    );
  };
  const handleDeleteRoom = () => {
    toast.promise(
      async () => {
        if (editRoom?.imageRoom) {
          for await (let imageOld of editRoom.imageRoom) {
            const desertRef = ref(storage, imageOld);
            await deleteObject(desertRef)
              .then(() => {
                console.log("delete success");
              })
              .catch(() => {
                console.log("Sai rooi");
              });
          }
        }
        await authApi
          .deleteRoomAdmin(
            editRoom?._id ? editRoom._id : "",
            process.env.TOKEN_ADMIN ? process.env.TOKEN_ADMIN : ""
          )
          .then(() => {
            setEditRoom(null);
            mutateRoom();
            // setPage(1);
          });
      },
      {
        pending: "Đang xoá phòng",
        success: "Xoá phòn thành công",
        error: "Xoá phòng thất bại",
      },
      {
        position: "top-center",
      }
    );
  };
  const handleLoginAdmin = () => {
    if (
      account === process.env.USERNAME_ADMIN &&
      password === process.env.PASSWORD_ADMIN
    ) {
      setAdmin(true);
    } else {
      toast.warning("Vui lòng nhập đúng tải khoản, mật khẩu ADMIN!", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (users && users?.data) setAllUser(users.data);
  }, [users]);
  useEffect(() => {
    console.log(rooms);

    if (rooms && rooms?.data) setAllRoom(rooms.data);
  }, [rooms]);
  if (admin) {
    return (
      <div className="max-h-screen relative h-screen bg-slate-100">
        <div className="flex w-[90%] justify-between mx-auto pt-[30px] pb-[30px]">
          <div className="w-[20%] h-fit bg-white rounded-[10px] overflow-hidden mr-[20px] text-text-main shadow-xl">
            <div className="">
              <div
                className={
                  page === 1
                    ? "px-[30px] flex items-center text-lg py-[20px] border-b-2 bg-main-color hover:cursor-pointer text-white"
                    : "px-[30px] flex items-center text-lg py-[20px] border-b-2 hover:bg-main-color hover:cursor-pointer hover:text-white"
                }
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

                <span className="select-none">Quản lí người dùng</span>
              </div>
              <div
                className={
                  page === 2
                    ? "px-[30px] flex items-center text-lg py-[20px] border-b-2 bg-main-color hover:cursor-pointer text-white"
                    : "px-[30px] flex items-center text-lg py-[20px] border-b-2 hover:bg-main-color hover:cursor-pointer hover:text-white"
                }
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
                className="px-[30px] flex items-center text-lg py-[20px] border-b-2 hover:bg-main-color hover:cursor-pointer hover:text-white"
                onClick={() => {
                  router.replace("/");
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

                <span className="select-none">Thoát</span>
              </div>
            </div>
          </div>
          <div className="w-[75%] m-h-[90%] bg-white rounded-[20px] shadow-xl overflow-scroll scroll-bar">
            {page === 1 ? (
              <table className="table-auto w-[95%] mt-[20px] text-lg mx-auto">
                <thead>
                  <tr className="border-b-2 pb-[20xp]">
                    <th className="w-[20%] text-start overflow-hidden">
                      Tên tài khoản
                    </th>
                    <th className="w-[20%] text-start overflow-hidden">
                      Tên người dùng
                    </th>
                    <th className="w-[20%] text-start overflow-hidden">
                      Số điện thoại
                    </th>
                    <th className="w-[25%] text-start overflow-hidden">
                      Email
                    </th>
                    <th className="w-[15%] text-center overflow-hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  {allUser &&
                    allUser.map((value) => (
                      <tr
                        key={value._id}
                        className="border-b-2 last:border-none mt-[10px]"
                      >
                        <td className="overflow-hidden">{value.userName}</td>
                        <td className="overflow-hidden">{value.name}</td>
                        <td className="overflow-hidden">{value.phoneNumber}</td>
                        <td className="overflow-hidden">{value.email}</td>
                        <td className="flex items-center h-full justify-evenly py-[10px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8 text-red-500 hover:opacity-70 hover:cursor-pointer"
                            onClick={() => setEditUser(value)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : allRoom.length > 0 ? (
              allRoom.map((value: CreateNewRoomPayload) => (
                <div
                  className="flex w-[90%] mx-[5%] pb-[30px] border-solid border-slate-200 border-b-2 last:border-none mt-[20px]"
                  key={value?._id}
                >
                  <div className="flex justify-between flex-grow items-center hover:cursor-pointer w-[90%] hover:opacity-70">
                    <div className="flex items-stretch w-[80%] flex-grow">
                      <div className="relative min-w-[216px] w-[216px] min-h-[152px] h-[152px] overflow-hidden rounded-[10px] z-0">
                        <Image
                          src={value.imageRoom[0]}
                          alt=""
                          layout="fill"
                          priority
                        ></Image>
                      </div>
                      <div className="flex flex-col min-w-0 justify-between ml-[20px]">
                        <p className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                          {value.nameRoom}
                        </p>
                        <div className="text-xl">
                          <div className="flex items-center">
                            <div className="flex items-center w-[40%]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.0}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                />
                              </svg>
                              <p className="ml-[5px]">{value.category}</p>
                            </div>
                            <div className="flex items-center w-[40%]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.0}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                              {value.stateRoom ? (
                                <p className="ml-[5px] text-green-500">
                                  Còn phòng
                                </p>
                              ) : (
                                <p className="ml-[5px] text-red-500">
                                  Hết phòng
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="flex items-center w-[40%]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.0}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                />
                              </svg>

                              <p className="ml-[5px]">{value.sex}</p>
                            </div>
                            <div className="flex items-center w-[40%]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.0}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
                                />
                              </svg>

                              <p className="ml-[5px]">{value.area}m2</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.0}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                              />
                            </svg>

                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                              {value.addressRoom}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-main-color flex flex-col justify-center w-[20%] items-center">
                      <p className="text-7xl">
                        {(value.price / 1000000).toFixed(1)}
                      </p>
                      <p className="text-xl">
                        {value.category === "Căn hộ" ? "tr/căn" : "tr/người"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-[10%]">
                    <button
                      className="hover:opacity-70"
                      onClick={() => setEditRoom(value ? value : null)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.0}
                        stroke="currentColor"
                        className="w-8 h-8 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-main-color text-center mt-[80px]">
                CHƯA CÓ PHÒNG
              </h1>
            )}
          </div>
        </div>
        {editUser && (
          <div className="w-full h-full fixed top-0 left-0 z-[100] bg-black bg-opacity-70">
            <div className="w-[400px] h-[150px] relative bg-white top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 rounded-[20px]">
              <p className="text-2xl font-bold text-main-color text-center pt-[30px]">
                Bạn có muốn xoá người dùng?
              </p>
              <div className="mx-auto w-fit mt-[10px]">
                <button
                  className="text-2xl font-bold text-white w-[150px] h-[60px] bg-main-color rounded-[20px] mr-[10px] hover:opacity-70"
                  onClick={() => handleDeleteUser()}
                >
                  Có
                </button>
                <button
                  className="text-2xl font-bold text-white w-[150px] h-[60px] bg-main-color rounded-[20px] hover:opacity-70"
                  onClick={() => setEditUser(null)}
                >
                  Không
                </button>
              </div>
            </div>
          </div>
        )}
        {editRoom && (
          <div className="w-full h-full fixed top-0 left-0 z-[100] bg-black bg-opacity-70">
            <div className="w-[400px] h-[150px] relative bg-white top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 rounded-[20px]">
              <p className="text-2xl font-bold text-main-color text-center pt-[30px]">
                Bạn có muốn xoá người dùng?
              </p>
              <div className="mx-auto w-fit mt-[10px]">
                <button
                  className="text-2xl font-bold text-white w-[150px] h-[60px] bg-main-color rounded-[20px] mr-[10px] hover:opacity-70"
                  onClick={() => handleDeleteRoom()}
                >
                  Có
                </button>
                <button
                  className="text-2xl font-bold text-white w-[150px] h-[60px] bg-main-color rounded-[20px] hover:opacity-70"
                  onClick={() => setEditRoom(null)}
                >
                  Không
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="max-h-screen relative h-screen bg-slate-100">
        <div className="fixed w-[500px] h-[350px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-50 rounded-[20px] shadow-lg">
          <p className="text-center text-4xl mt-[30px] text-main-color">
            ADMIN LOGIN
          </p>
          <input
            type="text"
            className="w-[300px] h-[50px] rounded-[10px] relative left-1/2 -translate-x-1/2 mt-[30px] px-[10px] border-2"
            placeholder="Tài khoản admin"
            value={account}
            onChange={(e) => setAccount(e.currentTarget.value)}
          />
          <input
            type="password"
            className="w-[300px] h-[50px] rounded-[10px] relative left-1/2 -translate-x-1/2 mt-[30px] px-[10px] border-2"
            placeholder="Mật khẩu admin"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button
            className="w-[300px] h-[50px] rounded-[10px] relative left-1/2 -translate-x-1/2 mt-[30px] px-[10px] bg-main-color hover:opacity-70 text-white"
            onClick={() => handleLoginAdmin()}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }
}
