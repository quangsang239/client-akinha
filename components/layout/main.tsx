import { useState } from "react";
import ReactMapGL from "react-map-gl";
// import Link from "next/link";
import Image from "next/image";
import ReactPaginate from "react-paginate";

import { LayoutProps, MapParameter } from "../../models";
// import Search from "./search";

export function MainLayout(props: LayoutProps) {
  const [viewState, setViewState] = useState<MapParameter>({
    latitude: 10.801607983756918,
    longitude: 106.66400649270845,
    zoom: 15,
  });
  const handlePageClick = (event: any) => {
    console.log(event.selected);
  };
  return (
    <div className="overflow-hidden relative grid grid-cols-12 border-b-2">
      <div className="min-h-screen col-span-8 border-r-2">
        <div className="m-[40px]">
          <div className="flex justify-between items-center border-b-2 border-[#ADB1C7] pb-[20px]">
            <div>
              <h1 className="text-pink-500">akinha</h1>
              <p className=" text-lg font-bold text-[#ADB1C7] mt-[10px]">
                Website tìm kiếm nhà trọ miễn phí cho học sinh sinh viên
              </p>
            </div>
            <span className="text-xl font-bold underline underline-offset-8">
              Đăng nhập để đăng phòng
            </span>
          </div>
          <div className="mt-[30px]">
            <div className="flex justify-between items-center ">
              <select
                name="quan"
                id="quan"
                className="w-[200px] h-[40px] px-[10px] text-lg rounded-[10px] outline outline-2 outline-[#ADB1C7] drop-shadow-lg"
              >
                <option value="Q1">Quận 1</option>
                <option value="Q2">Quận 2</option>
                <option value="Q3">Quận 3</option>
                <option value="Q5">Quận 5</option>
                <option value="Q8">Quận 8</option>
                <option value="Q9">Quận 9</option>
                <option value="Q10">Quận 10</option>
                <option value="BT">Quận Bình Thạnh</option>
                <option value="TD"> Quận Thủ Đức</option>
                <option value="TB">Tân Bình</option>
                <option value="TP">Tân Phú</option>
                <option value="BT">Bình Tân</option>
                <option value="GV">Gò Vấp</option>
                <option value="PN">Phú Nhuận</option>
              </select>
              <select
                name="price"
                id="price"
                className="w-[200px] h-[40px] px-[10px] text-lg rounded-[10px] outline outline-2 outline-[#ADB1C7] drop-shadow-lg"
              >
                <option value="default">Giá phòng</option>
                <option value="3tr">Dưới 3tr/tháng</option>
                <option value="7tr">Dưới 7tr/tháng</option>
              </select>
              <select
                name="sort"
                id="sort"
                className="w-[200px] h-[40px] px-[10px] text-lg rounded-[10px] outline outline-2 outline-[#ADB1C7] drop-shadow-lg"
              >
                <option value="up">Giá tăng dần</option>
                <option value="down">Giá giảm dần</option>
              </select>
            </div>
            <div className="mt-[20px] flex items-center">
              <div className="w-[400px] h-[45px] flex items-center rounded-[10px] drop-shadow-lg overflow-hidden border-2 border-[#ADB1C7]">
                <label
                  htmlFor="search"
                  className="w-[40px] h-[40px] flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </label>
                <input
                  className="h-full w-full px-[10px] outline-0 border-none"
                  type="text"
                  placeholder="Search"
                  id="search"
                />
              </div>
              <button className="drop-shadow-lg h-[45px] w-[100px] bg-blue-100 rounded-[10px] text-lg text-blue-700 font-bold ml-[20px]">
                Clear
              </button>
              <button className="drop-shadow-lg h-[45px] w-[100px] bg-blue-700 rounded-[10px] text-lg text-white font-bold ml-[20px]">
                Search
              </button>
            </div>
            <div className="mx-auto">
              {/* start item */}
              <div className="flex justify-between items-center p-[10px] rounded-[10px] drop-shadow-lg border-solid border-[#ADB1C7] border-2 mt-[20px]">
                <div className="flex items-stretch flex-grow">
                  <div className="relative w-[216px] h-[152px] overflow-hidden rounded-[10px]">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/akinha-486e2.appspot.com/o/home2.jpg?alt=media&token=7f820fd9-d3cb-44bc-a108-5da5653c56b1"
                      alt=""
                      layout="fill"
                    ></Image>
                  </div>
                  <div className="flex flex-col justify-between ml-[20px] ">
                    <p className="text-2xl font-bold">Ký túc xá quận Thủ Đức</p>
                    <div className="text-xl">
                      <div className="flex items-center">
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
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                          <p className="ml-[5px]">Ký túc xá</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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
                          <p className="ml-[5px] text-green-500">Còn phòng</p>
                        </div>
                      </div>
                      <div className="flex">
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
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>

                          <p className="ml-[5px]">Nam & Nữ</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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

                          <p className="ml-[5px]">30m2</p>
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

                        <p>
                          10 Đường số 4, Hiệp Bình Phước, Thủ Đức, Hồ Chí Minh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-pink-600 flex flex-col justify-center items-center">
                  <p className="text-7xl">1.5</p>
                  <p className="text-xl">tr/người</p>
                </div>
              </div>
              {/* end item */}
              {/* start item */}
              <div className="flex justify-between items-center p-[10px] rounded-[10px] drop-shadow-lg border-solid border-[#ADB1C7] border-2 mt-[20px]">
                <div className="flex items-stretch flex-grow">
                  <div className="relative w-[216px] h-[152px] overflow-hidden rounded-[10px]">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/akinha-486e2.appspot.com/o/home2.jpg?alt=media&token=7f820fd9-d3cb-44bc-a108-5da5653c56b1"
                      alt=""
                      layout="fill"
                    ></Image>
                  </div>
                  <div className="flex flex-col justify-between ml-[20px] ">
                    <p className="text-2xl font-bold">Ký túc xá quận Thủ Đức</p>
                    <div className="text-xl">
                      <div className="flex items-center">
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
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                          <p className="ml-[5px]">Ký túc xá</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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
                          <p className="ml-[5px] text-green-500">Còn phòng</p>
                        </div>
                      </div>
                      <div className="flex">
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
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>

                          <p className="ml-[5px]">Nam & Nữ</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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

                          <p className="ml-[5px]">30m2</p>
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

                        <p>
                          10 Đường số 4, Hiệp Bình Phước, Thủ Đức, Hồ Chí Minh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-pink-600 flex flex-col justify-center items-center">
                  <p className="text-7xl">1.5</p>
                  <p className="text-xl">tr/người</p>
                </div>
              </div>
              {/* end item */}
              {/* start item */}
              <div className="flex justify-between items-center p-[10px] rounded-[10px] drop-shadow-lg border-solid border-[#ADB1C7] border-2 mt-[20px]">
                <div className="flex items-stretch flex-grow">
                  <div className="relative w-[216px] h-[152px] overflow-hidden rounded-[10px]">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/akinha-486e2.appspot.com/o/home2.jpg?alt=media&token=7f820fd9-d3cb-44bc-a108-5da5653c56b1"
                      alt=""
                      layout="fill"
                    ></Image>
                  </div>
                  <div className="flex flex-col justify-between ml-[20px] ">
                    <p className="text-2xl font-bold">Ký túc xá quận Thủ Đức</p>
                    <div className="text-xl">
                      <div className="flex items-center">
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
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                          <p className="ml-[5px]">Ký túc xá</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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
                          <p className="ml-[5px] text-green-500">Còn phòng</p>
                        </div>
                      </div>
                      <div className="flex">
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
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>

                          <p className="ml-[5px]">Nam & Nữ</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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

                          <p className="ml-[5px]">30m2</p>
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

                        <p>
                          10 Đường số 4, Hiệp Bình Phước, Thủ Đức, Hồ Chí Minh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-pink-600 flex flex-col justify-center items-center">
                  <p className="text-7xl">1.5</p>
                  <p className="text-xl">tr/người</p>
                </div>
              </div>
              {/* end item */}
              {/* start item */}
              <div className="flex justify-between items-center p-[10px] rounded-[10px] drop-shadow-lg border-solid border-[#ADB1C7] border-2 mt-[20px]">
                <div className="flex items-stretch flex-grow">
                  <div className="relative w-[216px] h-[152px] overflow-hidden rounded-[10px]">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/akinha-486e2.appspot.com/o/home2.jpg?alt=media&token=7f820fd9-d3cb-44bc-a108-5da5653c56b1"
                      alt=""
                      layout="fill"
                    ></Image>
                  </div>
                  <div className="flex flex-col justify-between ml-[20px] ">
                    <p className="text-2xl font-bold">Ký túc xá quận Thủ Đức</p>
                    <div className="text-xl">
                      <div className="flex items-center">
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
                              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                            />
                          </svg>
                          <p className="ml-[5px]">Ký túc xá</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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
                          <p className="ml-[5px] text-green-500">Còn phòng</p>
                        </div>
                      </div>
                      <div className="flex">
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
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>

                          <p className="ml-[5px]">Nam & Nữ</p>
                        </div>
                        <div className="flex items-center ml-[20px]">
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

                          <p className="ml-[5px]">30m2</p>
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

                        <p>
                          10 Đường số 4, Hiệp Bình Phước, Thủ Đức, Hồ Chí Minh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-pink-600 flex flex-col justify-center items-center">
                  <p className="text-7xl">1.5</p>
                  <p className="text-xl">tr/người</p>
                </div>
              </div>
              {/* end item */}
            </div>
            <div className="flex pt-[40px] w-full h-[100px] items-center text-xl">
              <ReactPaginate
                className="flex w-full justify-between "
                breakLabel="..."
                breakClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                breakLinkClassName="flex h-full w-full justify-center items-center select-none"
                pageClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                pageLinkClassName="flex w-full h-full justify-center bg-[#E0E0E0] items-center select-none"
                nextLabel=">"
                nextClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                nextLinkClassName="w-full h-full flex justify-center bg-[#E0E0E0] items-center select-none"
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={15}
                previousLabel="<"
                previousClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                previousLinkClassName="flex w-full h-full justify-center bg-[#E0E0E0] items-center select-none"
                activeClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                activeLinkClassName="flex w-full h-full justify-center bg-blue-400 items-center select-none"
                onPageChange={handlePageClick}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-start-9 max-h-[1150px] col-span-4 overflow-hidden relative m-[20px]">
        <ReactMapGL
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v10"
          mapboxAccessToken={process.env.TOKEN_MAP}
        ></ReactMapGL>
      </div>
    </div>
  );
}
