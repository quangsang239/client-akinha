import { useState, FormEvent, useRef, memo } from "react";
import Image from "next/image";
import * as _ from "lodash";
import { storage } from "../../config/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { authApi } from "../../api-client";
import useSWR from "swr";
export interface INewRoomProps {
  setIsAddRoom: (isAddRoom: boolean) => void;
  user: {
    name: string;
    verified: boolean;
    userName: string;
    phoneNumber: string;
  };
}

export default memo(function NewRoom({ setIsAddRoom, user }: INewRoomProps) {
  console.log(user);

  const [images, setImages] = useState<FileList>();
  const [nameRoom, setNameRoom] = useState("");
  // const [utilities, setUtilities] = useState<string[]>([]);
  const utilities = useRef<string[]>([]);
  const imageList = useRef<string[]>([]);
  const [preImage, setPreImage] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [stateRoom, setStateRoom] = useState(false);
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [deposit, setDeposit] = useState("");
  const [aop, setAop] = useState("");
  const [water, setWater] = useState("");
  const [electricity, setElectricity] = useState("");
  const [category, setCategory] = useState("Phòng trọ");
  const [sex, setSex] = useState("Nam & Nữ");
  const inputFileChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      const preImage = event.currentTarget.files;
      let urlImage = [];
      for (let i = 0; i < preImage.length; i++) {
        urlImage.push(URL.createObjectURL(preImage[i]));
      }
      setPreImage(urlImage);
      setImages(event.currentTarget.files);
    }
  };

  const handleCheckBoxOnChange = (event: FormEvent<HTMLInputElement>) => {
    const index = _.indexOf(utilities.current, event.currentTarget.value);
    if (index >= 0) {
      _.remove(utilities.current, (value) => {
        return value === event.currentTarget.value;
      });
    } else {
      utilities.current.push(event.currentTarget.value);
    }
    console.log(utilities.current);
  };
  const handleClickAddRoom = async () => {
    if (images && images?.length >= 5) {
      if (
        price.length > 0 &&
        area.length > 0 &&
        deposit.length > 0 &&
        aop.length > 0 &&
        electricity.length > 0 &&
        water.length > 0
      ) {
        authApi.getLocation(address).then(async (result) => {
          console.log(result);

          if (result?.data.features && result?.data.features.length > 0) {
            const roomName = nameRoom
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/đ/g, "d")
              .replace(/Đ/g, "D")
              .replace(/\s/g, "")
              .toLowerCase();
            for await (const file of images) {
              let imageRef = ref(storage, `${roomName}/${file.name + v4()}`);
              await uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  imageList.current.push(url);
                });
              });
            }
            await authApi
              .createNewRoom({
                userName: user.userName,
                stateRoom,
                imageRoom: imageList.current,
                addressRoom: address.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                ),
                latitude: result?.data.features[0].center[1],
                longitude: result?.data.features[0].center[0],
                price: Number(price),
                nameRoom,
                area: Number(area),
                deposit: Number(deposit),
                aop: Number(aop),
                utilities: utilities.current,
                electricity: Number(electricity),
                water: Number(water),
                // name: data?.data.user.name,
                name: user.name,
                // phoneNumber: data?.data.user.phoneNumber,
                phoneNumber: user.phoneNumber,
                category,
                sex,
              })
              .then((response) => {
                if (response.data.code === 0) {
                  toast.success(response.data.message, {
                    position: "top-center",
                  });
                  setIsAddRoom(false);
                } else {
                  toast.error(response.data.message, {
                    position: "top-center",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
                toast.error("Lỗi server!", { position: "top-center" });
              });
          } else {
            toast.warning("Địa chỉ không hợp lệ!", { position: "top-center" });
          }
        });
      } else {
        toast.warning("Vui lòng điền đầy đủ thông tin!", {
          position: "top-center",
        });
      }
    } else {
      toast.warning("Vui lòng chọn ít nhất 5 ảnh!", { position: "top-center" });
    }
  };
  return (
    <div className="w-full h-full bg-black/50 absolute z-50 top-0">
      <div className="absolute w-[80%] h-[80%] bg-white top-[10%] left-[10%] scroll-bar opacity-100 rounded-[20px] overflow-auto">
        <div className="mt-[50px] w-[95%] m-auto">
          <div className="flex items-center justify-center border-b-2 pb-[30px]">
            <div className="flex items-center h-[50px] min-w-[200px] w-[200px] bg-pink-500 rounded-[10px] mr-[50px]">
              <input
                id="file"
                className="mx-auto w-[0px] h-[0px]-z-50 absolute"
                type="file"
                onChange={inputFileChange}
                accept="image/*"
                multiple
              />
              <div className="flex justify-between items-center w-full h-full px-[10px] text-white font-bold">
                <label
                  htmlFor="file"
                  className="w-full h-full flex justify-between items-center"
                >
                  Chọn ít nhất 5 hình
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.0}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </label>
              </div>
            </div>
            <div className="flex overflow-auto scroll-bar-image">
              {preImage.map((value, index) => (
                <div
                  key={index}
                  className="min-w-[150px] w-[150px] h-[150px] relative mx-[5px] rounded-[10px] overflow-hidden bg-slate-400"
                >
                  <Image priority src={value} alt="" layout="fill" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[30px] border-b-2 pb-[30px]">
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-col text-lg mb-[20px] w-full">
                <label htmlFor="name-room">Tên phòng</label>
                <input
                  type="text"
                  id="name-room"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  required
                  value={nameRoom}
                  onChange={(e) => setNameRoom(e.currentTarget.value)}
                />
              </div>
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="price">Giá phòng (vnd)</label>
                <input
                  type="number"
                  id="price"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  value={price}
                  onChange={(e) => setPrice(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="area">Diện tích (m2)</label>
                <input
                  type="number"
                  id="area"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  value={area}
                  onChange={(e) => setArea(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="deposit">Đặt cọc (vnd)</label>
                <input
                  type="number"
                  id="deposit"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  value={deposit}
                  onChange={(e) => setDeposit(e.currentTarget.value)}
                  required
                />
              </div>
            </div>
            <div className="mt-[30px] flex flex-wrap justify-between">
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="aop">Sức chứa (người)</label>
                <input
                  type="number"
                  id="aop"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  value={aop}
                  onChange={(e) => setAop(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="electricity">Tiền điện (vnd)</label>
                <input
                  type="number"
                  id="electricity"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  value={electricity}
                  onChange={(e) => setElectricity(e.currentTarget.value)}
                  required
                />
              </div>
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="water">Tiền nước (vnd)</label>
                <input
                  type="number"
                  id="water"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  value={water}
                  onChange={(e) => setWater(e.currentTarget.value)}
                  required
                />
              </div>
            </div>
            <div className="flex w-[100%] justify-between mt-[20px]">
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="sex">Giới tính</label>
                <select
                  id="sex"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  onChange={(e) => setSex(e.currentTarget.value)}
                  value={sex}
                >
                  <option value="Nam & Nữ">Nam & Nữ</option>
                  <option value="Phòng nữ">Phòng nữ</option>
                  <option value="Phòng nam">Phòng nam</option>
                </select>
              </div>
              <div className="flex flex-col text-lg w-[30%]">
                <label htmlFor="category">Loại phòng</label>
                <select
                  id="sex"
                  className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                  onChange={(e) => setCategory(e.currentTarget.value)}
                  value={category}
                >
                  <option value="Phòng trọ">Phòng trọ</option>
                  <option value="Ký túc xá">Ký túc xá</option>
                  <option value="Căn hộ">Căn hộ</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col text-lg mt-[20px] w-full">
              <label htmlFor="location">Địa chỉ</label>
              <input
                type="text"
                id="location"
                className="w-full h-[40px] bg-slate-100 outline-none px-[5px] mt-[5px]"
                value={address}
                onChange={(e) => {
                  setAddress(e.currentTarget.value);
                }}
                required
              />
            </div>
          </div>
          <div className="mt-[20px] border-b-2 pb-[30px]">
            <span className="text-2xl font-bold text-pink-500">Tiện ích</span>
            <div className="text-xl font-bold">
              <div className="flex flex-wrap">
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="maylanh" className="select-none">
                    Máy lạnh
                  </label>
                  <input
                    type="checkbox"
                    id="maylanh"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Máy lạnh"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="chodexe" className="select-none">
                    Chỗ để xe
                  </label>
                  <input
                    type="checkbox"
                    id="chodexe"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Chỗ để xe"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="wifi" className="select-none">
                    Wifi
                  </label>
                  <input
                    type="checkbox"
                    id="wifi"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Wifi"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="tudo" className="select-none">
                    Tự do
                  </label>
                  <input
                    type="checkbox"
                    id="tudo"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Tự do"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label
                    htmlFor="khongchungchu"
                    className="select-none text-xs"
                  >
                    Không chung chủ
                  </label>
                  <input
                    type="checkbox"
                    id="khongchungchu"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Không chung chủ"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="tulanh" className="select-none">
                    Tủ lạnh
                  </label>
                  <input
                    type="checkbox"
                    id="tulanh"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Tủ lạnh"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="maygiat" className="select-none">
                    Máy giặt
                  </label>
                  <input
                    type="checkbox"
                    id="maygiat"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Máy giặt"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="baove" className="select-none">
                    Bảo vệ
                  </label>
                  <input
                    type="checkbox"
                    id="baove"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Bảo vệ"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="giuongngu" className="select-none text-lg">
                    Giường ngủ
                  </label>
                  <input
                    type="checkbox"
                    id="giuongngu"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Giường ngủ"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="nauan" className="select-none">
                    Nấu ăn
                  </label>
                  <input
                    type="checkbox"
                    id="nauan"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Nấu ăn"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="Tudo" className="select-none">
                    Tủ đồ
                  </label>
                  <input
                    type="checkbox"
                    id="Tudo"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Tủ đồ"
                    onChange={handleCheckBoxOnChange}
                  />
                </div>
                <div className="flex w-[150px] justify-between items-center mt-[20px] mx-[20px] h-[40px] bg-slate-100 px-[10px] rounded-[5px]">
                  <label htmlFor="conphong" className="select-none">
                    Còn phòng
                  </label>
                  <input
                    type="checkbox"
                    id="conphong"
                    className="w-[20px] h-[20px] ml-[10px]"
                    value="Còn phòng"
                    onChange={() => setStateRoom(!stateRoom)}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="mb-[50px] w-[200px] h-[50px] bg-pink-500 rounded-[10px] px-[10px] mt-[60px] mx-auto text-white font-bold text-xl"
            onClick={() => handleClickAddRoom()}
          >
            Thêm phòng
          </button>
        </div>
        <div
          className="absolute top-0 right-0 hover:cursor-pointer hover:opacity-70"
          onClick={() => setIsAddRoom(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
});