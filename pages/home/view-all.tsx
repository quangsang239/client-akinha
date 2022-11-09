import Image from "next/image";
import Header from "../../components/common/header";

export interface IViewAllProps {}

export default function ViewAll(props: IViewAllProps) {
  return (
    <>
      <Header />
      <div className=" min-h-screen bg-slate-100">
        <div className="flex w-[90%] mx-auto justify-between pt-[100px]">
          <div className="w-[20%] bg-white rounded-[10px]">
            <div className="mx-[30px] my-[20px]">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">Bộ lọc</span>
                <button className="text-blue-500 outline-2 outline outline-blue-500 px-[10px] rounded-[999px] hover:opacity-70">
                  Áp dụng
                </button>
              </div>
            </div>
            {/* start feature */}
            <div className="bg-blue-50">
              <div className="mx-[20px] min-h-[50px] h-auto hover:opacity-70 hover:cursor-pointer border-b-2 border-white last:border-none group">
                <div className="flex items-center justify-between peer group pt-[10px]">
                  <span className="text-xl">Loại phòng</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.0}
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:rotate-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
                <div className="hidden group-hover:block">
                  <div className="flex items-center mx-[20px] h-[40px] font-bold hover:cursor-pointer">
                    <input
                      id="phongchothue"
                      type="Checkbox"
                      className="w-[20px] h-[20px]"
                    />
                    <label
                      htmlFor="phongchothue"
                      className="ml-[20px] hover:cursor-pointer select-none"
                    >
                      Phòng cho thuê
                    </label>
                  </div>
                  <div className="flex items-center mx-[20px] h-[40px] font-bold hover:cursor-pointer">
                    <input
                      id="kitucxa"
                      type="Checkbox"
                      className="w-[20px] h-[20px]"
                    />
                    <label
                      htmlFor="kitucxa"
                      className="ml-[20px] hover:cursor-pointer select-none"
                    >
                      Kí túc xá
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* end feature */}
          </div>
          <div className="w-[78%] bg-white rounded-[10px]">
            {/* start item */}
            <div className="flex justify-between items-center pb-[30px] border-solid border-slate-200 border-b-2 last:border-none mt-[20px] mx-[50px]">
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
            <div className="flex justify-between items-center pb-[30px] border-solid border-slate-200 border-b-2 last:border-none mt-[20px] mx-[50px]">
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
        </div>
      </div>
    </>
  );
}
