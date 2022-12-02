import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { authApi } from "../../api-client";
import { useRouter } from "next/router";
export interface IProfileProps {
  user: {
    name: string;
    verified: boolean;
    userName: string;
  };
}

export default function Profile({ user }: IProfileProps) {
  const router = useRouter();
  const { data, error, mutate } = useSWR(`/user/get-profile/${user.userName}`);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [verified, setVerified] = useState("false");
  const [verifiedCurrent, setVerifiedCurrent] = useState("false");
  const [isEmail, setIsEmail] = useState(true);

  useEffect(() => {
    setInputEmail(data?.data.user.email);
    setInputPhoneNumber(data?.data.user.phoneNumber);
    setInputName(data?.data.user.name);
    setVerified(data?.data.user.verified);
    setInputUsername(data?.data.user.userName);
    setVerifiedCurrent(data?.data.user.verified);
    setIsEmail(true);
  }, [data]);
  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [error]);
  const handleOnchangeInputName = (e: FormEvent<HTMLInputElement>) => {
    setInputName(e.currentTarget.value);
  };
  const handleOnchangeInputEmail = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value !== data?.data.user.email) {
      setVerifiedCurrent("true");
      setVerified("false");
      if (
        e.currentTarget.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        setIsEmail(true);
      } else setIsEmail(false);
    } else {
      setVerified("true");
      setIsEmail(true);
    }
    setInputEmail(e.currentTarget.value);
  };
  const handleOnchangeInputPhoneNumber = (e: FormEvent<HTMLInputElement>) => {
    setInputPhoneNumber(e.currentTarget.value);
  };
  const handleSendEmail = () => {
    authApi
      .sendEmail(inputUsername, inputEmail)
      .then(() => {
        toast.success("Đã gửi mã xác thực vào email!", {
          position: "top-center",
        });
        setVerifiedCurrent("true");
      })
      .catch(() => {
        toast.error("Gửi xác thực lỗi!", {
          position: "top-center",
        });
      });
  };
  const onClickSaveProfile = () => {
    if (
      isEmail &&
      inputEmail.length > 0 &&
      inputName.length > 0 &&
      inputPhoneNumber.length > 0
    ) {
      if (inputEmail !== data?.data.user.email) {
        authApi
          .updateProfile({
            userName: data?.data.user.userName,
            phoneNumber: inputPhoneNumber,
            email: inputEmail,
            name: inputName,
            changeEmail: true,
          })
          .then(() => {
            toast.success("Cập nhật thông tin thành công!", {
              position: "top-center",
            });
            mutate();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (
          inputName !== data?.data.user.name ||
          inputPhoneNumber !== data?.data.user.phoneNumber
        ) {
          authApi
            .updateProfile({
              userName: data?.data.user.userName,
              phoneNumber: inputPhoneNumber,
              email: inputEmail,
              name: inputName,
              changeEmail: false,
            })
            .then((result) => {
              toast.success("Cập nhật thông tin thành công!", {
                position: "top-center",
              });
              mutate();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } else {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
    }
  };
  return (
    <div className="w-[70%] min-h-[500px] bg-white rounded-[10px] text-text-main">
      <div className="mx-[30px] mt-[20px]">
        <div className="py-[20px] border-b-2">
          <h3 className="mb-[10px]">Thông tin cá nhân</h3>
          <p className="text-subtext">Để đăng phòng bạn cần xác thực email!</p>
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="user" className="text-lg">
            Tài khoản
          </label>
          <input
            id="user"
            className="px-[10px] h-[50px] w-[60%] border-2 rounded-[10px] ml-[100px]"
            disabled
            value={inputUsername}
          />
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="user" className="text-lg">
            Họ và tên
          </label>
          <input
            id="user"
            className="px-[10px] h-[50px] w-[60%] border-2 rounded-[10px] ml-[100px] outline-none"
            value={inputName}
            onChange={handleOnchangeInputName}
          />
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="user" className="text-lg">
            Số điện thoại
          </label>
          <input
            id="user"
            className="px-[10px] h-[50px] w-[60%] border-2 rounded-[10px] ml-[100px] outline-none"
            value={inputPhoneNumber}
            onChange={handleOnchangeInputPhoneNumber}
          />
        </div>
        <div className="py-[10px] border-b-2 flex items-center justify-between">
          <label htmlFor="user" className="text-lg">
            Email
          </label>
          <div className="w-[60%]">
            <div className="w-full flex justify-between items-center h-[50px] overflow-hidden border-2 rounded-[10px]">
              <input
                id="user"
                className="w-full h-full px-[10px] outline-none"
                value={inputEmail}
                onChange={handleOnchangeInputEmail}
              />
              {isEmail === true ? null : (
                <p className="text-red-500 mx-[10px] select-none text-sm">
                  Chưa đúng định dạng email!
                </p>
              )}
              {verified === "true" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.0}
                  stroke="currentColor"
                  className="w-[50px] h-[50px] bg-[#FAFAFA] text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-[50px] h-[50px] bg-[#FAFAFA] text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            {verifiedCurrent === "true" ? null : (
              <p
                className="text-red-500 mt-[10px] hover:cursor-pointer select-none hover:opacity-70"
                onClick={() => handleSendEmail()}
              >
                Gửi mã xác thực vào email?
              </p>
            )}
          </div>
        </div>
        <button
          className="h-[50px] w-[60%] bg-main-color my-[20px] rounded-[10px] text-white text-lg relative float-right hover:opacity-70"
          onClick={() => onClickSaveProfile()}
        >
          Lưu thông tin
        </button>
      </div>
    </div>
  );
}
