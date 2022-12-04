import ReactPaginate from "react-paginate";
import Image from "next/image";
import { IManagerProfileProps } from "./manager-profile";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateNewRoomPayload } from "../../models";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../config/config";
import { authApi } from "../../api-client";
export interface IManagerRoomProps {}

export default function ManagerRoom({
  setIsAddRoom,
  user,
  setDataRoom,
  isAddRoom,
}: IManagerProfileProps) {
  const [page, setPage] = useState(1);
  const { data: users } = useSWR(`/user/get-profile/${user.userName}`);
  const { data: rooms, mutate } = useSWR(
    `/room/get-room/${user.userName}/page=${page}`,
    { dedupingInterval: 0, refreshInterval: 0, revalidateOnMount: true }
  );
  const [deleteId, setDeleteId] = useState<CreateNewRoomPayload | null>(null);
  useEffect(() => {
    mutate();
  }, [isAddRoom]);
  const handleButtonAddRoom = () => {
    if (users?.data.user.verified === "true") {
      setIsAddRoom(true);
    } else {
      toast.warning("Bạn cần xác thực email trước khi đăng phòng!");
    }
  };
  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };
  const handleDeleteRoom = () => {
    toast.promise(
      async () => {
        if (deleteId?.imageRoom) {
          for await (let imageOld of deleteId.imageRoom) {
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
        await authApi.deleteRoom(deleteId?._id ? deleteId._id : "").then(() => {
          setDeleteId(null);
          mutate();
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
  return (
    <>
      <div className="w-[78%] bg-white rounded-[10px]">
        <div className="mx-[5%] border-b-2 pb-[20px] text-white">
          <button
            onClick={() => handleButtonAddRoom()}
            className="w-[200px] h-[50px] rounded-[10px] px-[10px] bg-main-color mt-[50px]"
          >
            Đăng phòng
          </button>
        </div>
        {/* start item */}
        {rooms?.data &&
          rooms.data.data.map((value: CreateNewRoomPayload) => (
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
                            <p className="ml-[5px] text-green-500">Còn phòng</p>
                          ) : (
                            <p className="ml-[5px] text-red-500">Hết phòng</p>
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
                  onClick={() => setDeleteId(value ? value : null)}
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
                <button
                  className="mt-[20px] hover:opacity-70"
                  onClick={() => {
                    setDataRoom(value);
                    setIsAddRoom(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.0}
                    stroke="currentColor"
                    className="w-8 h-8 text-yellow-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        {/* end item */}

        <div
          className={
            rooms?.data.totalDocument / 3 > 1
              ? "flex py-[50px] w-full h-[100px] items-center text-xl"
              : "hidden"
          }
        >
          <ReactPaginate
            className="flex w-full mx-[50px] justify-between "
            breakLabel="..."
            breakClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
            breakLinkClassName="flex h-full w-full bg-[#fb836d] text-white justify-center items-center select-none"
            pageClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
            pageLinkClassName="flex w-full h-full justify-center bg-[#E0E0E0] items-center select-none"
            nextLabel=">"
            nextClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
            nextLinkClassName="w-full h-full flex justify-center bg-[#fb836d] text-white items-center select-none"
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={rooms?.data.totalDocument / 3}
            forcePage={page - 1}
            previousLabel="<"
            previousClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
            previousLinkClassName="flex w-full h-full justify-center bg-[#fb836d] text-white items-center select-none"
            activeClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
            activeLinkClassName="flex w-full h-full justify-center active-button items-center select-none"
            onPageChange={(e) => handlePageClick(e)}
          />
        </div>
      </div>
      {deleteId && (
        <div className="w-full h-full fixed top-0 left-0 z-[100] bg-black bg-opacity-70">
          <div className="w-[400px] h-[150px] relative bg-white top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 rounded-[20px]">
            <p className="text-2xl font-bold text-main-color text-center pt-[30px]">
              Bạn có muốn xoá phòng
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
                onClick={() => setDeleteId(null)}
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
