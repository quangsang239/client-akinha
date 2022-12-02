import { useState, useEffect, useRef } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
// import Link from "next/link";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { useRouter } from "next/router";
import { CreateNewRoomPayload, LayoutProps, MapParameter } from "../../models";
import NotFound from "./not-found";
import { authApi } from "../../api-client";
import { Loading } from "../common/loading";
import Footer from "../common/footer";

export function MainLayout(props: LayoutProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [sex, setSex] = useState("");
  const [district, setDistrict] = useState("");
  const [item, setItem] = useState<any>();
  const [priceSearch, setPriceSearch] = useState("20000000");
  const [popup, setPopup] = useState<CreateNewRoomPayload | null>(null);

  const [user, setUser] = useState({
    userName: "",
    verified: false,
    name: "",
    phoneNumber: "",
  });
  const { data } = useSWR(
    `/room/page=${page}?district=${district}&category=${category}&sex=${sex}&price=${priceSearch}`
  );
  const [currentPrice, setCurrentPrice] = useState("20000000");

  const [viewState, setViewState] = useState<MapParameter>({
    latitude: 10.801607983756918,
    longitude: 106.66400649270845,
    zoom: 15,
  });
  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };
  useEffect(() => {
    setItem(data?.data);
  }, [data]);
  useEffect(() => {
    setViewState({
      latitude: item?.data[0] ? item?.data[0].latitude : 10.801607983756918,
      longitude: item?.data[0] ? item?.data[0].longitude : 106.66400649270845,
      zoom: 15,
    });
  }, [item]);
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
  if (item) {
    return (
      <>
        <div className="overflow-hidden relative grid grid-cols-12 border-b-2">
          <div className="min-h-screen relative col-span-8 border-r-2">
            <div className="m-[40px] relative h-full">
              <div className="flex justify-between relative items-center border-b-2 border-[#ADB1C7] pb-[20px]">
                <div>
                  <h1 className="text-main-color">akinha</h1>
                  <p className=" text-lg font-bold text-[#ADB1C7] mt-[10px]">
                    Website tìm kiếm nhà trọ miễn phí cho học sinh sinh viên
                  </p>
                </div>

                {user?.userName && user.userName.length > 0 ? (
                  <span
                    className="text-xl font-bold underline underline-offset-8 select-none hover:cursor-pointer hover:opacity-70"
                    onClick={() => router.push("/profile")}
                  >
                    {user.userName}
                  </span>
                ) : (
                  <span
                    className="text-xl font-bold underline underline-offset-8 select-none hover:cursor-pointer hover:opacity-70"
                    onClick={() => router.push("/login")}
                  >
                    Đăng nhập để đăng phòng
                  </span>
                )}
              </div>
              <div className="mt-[30px]">
                <div className="flex justify-between items-center ">
                  <select
                    name="quan"
                    id="quan"
                    className="w-[200px] h-[40px] px-[10px] text-lg rounded-[10px] outline outline-2 outline-[#ADB1C7] shadow-lg"
                    value={district}
                    onChange={(e) => setDistrict(e.currentTarget.value)}
                  >
                    <option value="">Chọn quận</option>
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 2">Quận 2</option>
                    <option value="Quận 3">Quận 3</option>
                    <option value="Quận 5">Quận 5</option>
                    <option value="Quận 8">Quận 8</option>
                    <option value="Quận 9">Quận 9</option>
                    <option value="Quận 10">Quận 10</option>
                    <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
                    <option value="Quận Thủ Đức"> Quận Thủ Đức</option>
                    <option value="Tân Bình">Tân Bình</option>
                    <option value="Tân Phú">Tân Phú</option>
                    <option value="Bình Tân">Bình Tân</option>
                    <option value="Gò Vấp">Gò Vấp</option>
                    <option value="Phú Nhuận">Phú Nhuận</option>
                  </select>
                  <select
                    name="price"
                    id="price"
                    className="w-[200px] h-[40px] px-[10px] text-lg rounded-[10px] outline outline-2 outline-[#ADB1C7] shadow-lg"
                    value={category}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                  >
                    <option value="">Loại phòng</option>
                    <option value="Phòng trọ">Phòng trọ</option>
                    <option value="Ký túc xá">Ký túc xá</option>
                    <option value="Căn hộ">Căn hộ</option>
                  </select>
                  <select
                    name="sort"
                    id="sort"
                    className="w-[200px] h-[40px] px-[10px] text-lg rounded-[10px] outline outline-2 outline-[#ADB1C7] shadow-lg"
                    value={sex}
                    onChange={(e) => setSex(e.currentTarget.value)}
                  >
                    <option value="">Giới tính</option>
                    <option value="Nam & Nữ">Nam & Nữ</option>
                    <option value="Phòng nam">Phòng nam</option>
                    <option value="Phòng nữ">Phòng nữ</option>
                  </select>
                </div>
                <div className="mt-[20px] flex justify-between items-center">
                  <div className="w-[80%] h-[45px] flex justify-between items-center rounded-[10px] overflow-hidden">
                    <label
                      htmlFor="search"
                      className="h-[40px] w-[300px] whitespace-nowrap text-xl flex items-center justify-center mr-[20px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.0}
                        stroke="currentColor"
                        className="w-[45px] h-[45px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                      {currentPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      đồng
                    </label>
                    <input
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      type="range"
                      placeholder="Search"
                      id="search"
                      min="0"
                      value={currentPrice}
                      max="20000000"
                      onChange={(e) => setCurrentPrice(e.currentTarget.value)}
                    />
                  </div>

                  <button
                    className="shadow-lg px-[10px] h-[45px] w-[20%] bg-main-color rounded-[10px] text-lg text-white font-bold ml-[20px]"
                    onClick={() => setPriceSearch(currentPrice)}
                  >
                    Tìm kiếm
                  </button>
                </div>
                <div className="mx-auto w-full">
                  {/* start item */}
                  {item?.data && item?.data.length !== 0 ? (
                    item?.data.map((value: CreateNewRoomPayload) => (
                      <div
                        className="flex justify-between items-center p-[10px] overflow-hidden rounded-[10px] shadow-lg border-solid border-[#ADB1C7] border-2 mt-[20px] hover:cursor-pointer hover:opacity-70"
                        key={value._id}
                        onClick={() => router.push(`/room/${value._id}`)}
                      >
                        <div className="flex items-stretch w-[80%]">
                          <div className="relative min-w-[216px] w-[216px] min-h-[152px] h-[152px] overflow-hidden rounded-[10px]">
                            <Image
                              src={value?.imageRoom[0]}
                              alt=""
                              layout="fill"
                            ></Image>
                          </div>
                          <div className="flex flex-col min-w-0 justify-between ml-[20px]">
                            <p className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                              {value?.nameRoom}
                            </p>
                            <div className="text-xl flex-shrink-0">
                              <div className="flex items-center">
                                <div className="flex items-center w-[30%]">
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
                                  <p className="ml-[5px]">{value?.category}</p>
                                </div>
                                <div className="flex items-center ml-[20px] w-[30%]">
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
                                  {value?.stateRoom ? (
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
                                <div className="flex items-center w-[30%]">
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

                                  <p className="ml-[5px]">{value?.sex}</p>
                                </div>
                                <div className="flex items-center ml-[20px] w-[30%]">
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

                                  <p className="ml-[5px]">{value?.area}m2</p>
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
                                  {value?.addressRoom}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-main-color flex flex-col justify-center items-center w-[20%]">
                          <p className="text-7xl">
                            {(value?.price / 1000000).toFixed(1)}
                          </p>
                          <p className="text-xl">
                            {value?.category === "Căn hộ"
                              ? "tr/căn"
                              : value?.category === "Phòng trọ"
                              ? "tr/phòng"
                              : "tr/người"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <NotFound />
                  )}
                  {/* end item */}
                </div>

                <div
                  className={
                    item?.totalDocument / 4 > 1
                      ? "flex pt-[40px] w-full h-[100px] items-center text-xl"
                      : "hidden"
                  }
                >
                  <ReactPaginate
                    className="flex w-full justify-between "
                    breakLabel="..."
                    breakClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                    breakLinkClassName="flex h-full w-full justify-center bg-[#fb836d] items-center select-none"
                    pageClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                    pageLinkClassName="flex w-full h-full justify-center bg-[#E0E0E0] items-center select-none"
                    nextLabel=">"
                    nextClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                    nextLinkClassName="w-full h-full flex justify-center bg-[#fb836d] text-white items-center select-none"
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={item?.totalDocument / 4}
                    forcePage={page - 1}
                    previousLabel="<"
                    previousClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                    previousLinkClassName="flex w-full h-full justify-center bg-[#fb836d] text-white items-center select-none"
                    activeClassName="h-[50px] w-[50px] rounded-[10px] overflow-hidden"
                    activeLinkClassName="flex w-full h-full justify-center bg-[#fb836d] text-white items-center select-none"
                    onPageChange={handlePageClick}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-9 max-h-[95%] min-h-[1140px] h-[95%] col-span-4 overflow-hidden relative m-[20px] z-50">
            <ReactMapGL
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              mapStyle="mapbox://styles/mapbox/streets-v10"
              mapboxAccessToken={process.env.TOKEN_MAP}
              style={{
                minWidth: "100%",
                minHeight: "100%",
                width: "100%",
                height: "100%",
              }}
            >
              <GeolocateControl position="top-left" />
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />
              {item?.data[0] &&
                item?.data.map((value: CreateNewRoomPayload) => (
                  <Marker
                    key={value._id}
                    latitude={value.latitude}
                    longitude={value.longitude}
                    anchor="bottom"
                    onClick={(e) => {
                      e.originalEvent.stopPropagation();
                      setPopup(value);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-red-500"
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
                  </Marker>
                ))}
              {popup && (
                <Popup
                  anchor="bottom"
                  latitude={Number(popup.latitude)}
                  longitude={Number(popup.longitude)}
                  onClose={() => setPopup(null)}
                  className="map-box-popup"
                >
                  <div className="m-[-10px]">
                    <div
                      className="relative w-[250px] h-[200px] hover:cursor-pointer hover:opacity-70"
                      onClick={() => router.push(`room/${popup._id}`)}
                    >
                      <Image layout="fill" src={popup.imageRoom[0]} alt="" />
                    </div>
                    <p className="text-sm mx-[5px] mt-[10px]">
                      {popup.addressRoom}
                    </p>
                    <p className="text-sm mx-[5px] mt-[5px]">
                      Giá:{" "}
                      {popup.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                      đồng
                    </p>
                    {popup.stateRoom ? (
                      <p className="text-sm mx-[5px] mt-[5px] text-green-500">
                        Còn phòng
                      </p>
                    ) : (
                      <p className="text-sm mx-[5px] mt-[5px] text-red-500">
                        Hết phòng
                      </p>
                    )}
                  </div>
                </Popup>
              )}
            </ReactMapGL>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return <Loading />;
  }
}
