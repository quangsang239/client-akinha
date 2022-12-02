import { useState, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { authApi } from "../api-client";

interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState("login");
  const [inputUsername, setInputUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordStrength, setIsPasswordStrength] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputConfirm, setInputConfirm] = useState("");
  const [isEmail, setIsEmail] = useState(true);

  const handleOnChangeLogin = () => {
    setIsActive("login");
  };
  const handleOnChangeRegister = () => {
    setIsActive("register");
  };
  const handleOnchangeInputUsername = (e: FormEvent<HTMLInputElement>) => {
    setInputUsername(e.currentTarget.value);
  };
  const handleOnchangeInputPassword = (e: FormEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value.match("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")
    ) {
      setIsPasswordStrength(true);
    } else {
      setIsPasswordStrength(false);
    }
    setInputPassword(e.currentTarget.value);
  };
  const handleOnchangeInputEmail = (e: FormEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setIsEmail(true);
    } else setIsEmail(false);
    setInputEmail(e.currentTarget.value);
  };
  const handleOnchangeInputConfirm = (e: FormEvent<HTMLInputElement>) => {
    setInputConfirm(e.currentTarget.value);
  };
  const handleOnchangeInputName = (e: FormEvent<HTMLInputElement>) => {
    setInputName(e.currentTarget.value);
  };
  const handleOnchangeInputPhoneNumber = (e: FormEvent<HTMLInputElement>) => {
    setInputPhoneNumber(e.currentTarget.value);
  };
  useEffect(() => {}, []);
  const handleClickLogin = async () => {
    try {
      if (inputUsername.length > 0 && inputPassword.length > 0) {
        authApi
          .login({
            userName: inputUsername,
            password: inputPassword,
          })
          .then((data) => {
            localStorage.setItem(
              "user",
              JSON.stringify({
                userName: data.data.userName,
                verified: data.data.verified,
                name: data.data.name,
                phoneNumber: data.data.phoneNumber,
              })
            );
            if (data.data.code === 0) {
              toast.success(data.data.message);
              router.replace("/profile");
            } else {
              toast.error(data.data.message);
            }
          });
      } else {
        toast.warning("Vui lòng diền đầy đủ thông tin!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickRegister = () => {
    try {
      if (
        inputConfirm.length > 0 &&
        isEmail &&
        inputName.length > 0 &&
        isPasswordStrength &&
        inputPhoneNumber.length > 0 &&
        inputUsername.length > 0
      ) {
        if (inputPassword === inputConfirm) {
          authApi
            .register({
              userName: inputUsername,
              name: inputName,
              password: inputPassword,
              phoneNumber: inputPhoneNumber,
              email: inputEmail,
            })
            .then((data) => {
              if (data.data.code === 2) {
                toast.warning(data.data.message, { position: "top-center" });
              } else {
                toast.success(data.data.message, { position: "top-center" });
                setIsActive("login");
              }
            });
        } else {
          toast.warning("Mật khẩu xác nhận khôg đúng", {
            position: "top-center",
          });
        }
      } else {
        toast.warning("Còn ô dữ dữ liệu chưa điền!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-c-1 to-pink-c-1 w-screen h-screen">
      <div className={isActive === "login" ? "form-login" : "form-register"}>
        <div
          className="bg-[#EFEFEF] relative bg-opacity-50 z-20 w-full h-full overflow-hidden scroll-bar rounded-[30px]"
          id="form"
        >
          {/* This code here for login */}
          {isActive === "login" ? (
            <div className="w-[80%] p-[10%] h-[60%] absolute left-1/2 -translate-x-1/2 z-10 transition duration-[200s] ease-in-out">
              <h1 className="text-white mb-[10px] text-center">Đăng nhập</h1>
              <div className="group-login">
                <input
                  type="text"
                  className="input-text peer px-[10px]"
                  placeholder="Tài khoản"
                  required
                  value={inputUsername}
                  id="username"
                  onChange={handleOnchangeInputUsername}
                />
              </div>
              <div className="group-login">
                <input
                  id="password"
                  type="password"
                  className="input-text peer px-[10px]"
                  placeholder="Mật khẩu"
                  required
                  value={inputPassword}
                  onChange={handleOnchangeInputPassword}
                />
              </div>
              <button
                className="relative w-[100%] px-[15px] h-[50px] mt-[20px] bg-gradient-to-r bottom-[-20%] from-blue-c-3 to-pink-c-2 text-white left-1/2 -translate-x-1/2 -translate-y-1/2 active:opacity-50 duration-200 rounded-[10px]"
                onClick={() => handleClickLogin()}
              >
                Đăng nhập
              </button>
            </div>
          ) : (
            // This code here for register
            <div className="w-[90%] p-[10%] h-[60%] absolute left-1/2 -translate-x-1/2 z-10 ">
              <h1 className="text-white mb-[0px] text-center">Đăng ký</h1>
              <div className="group-register">
                <input
                  id="username"
                  type="text"
                  className="input-text peer px-[10px]"
                  placeholder="Tài khoản"
                  required
                  value={inputUsername}
                  onChange={handleOnchangeInputUsername}
                />
              </div>
              <div className="relative">
                <div className="group-register">
                  <input
                    id="email"
                    type="text"
                    className="input-text peer px-[10px]"
                    placeholder="Email"
                    required
                    value={inputEmail}
                    onChange={handleOnchangeInputEmail}
                  />
                </div>
                {isEmail ? null : (
                  <p className="text-red-500 mx-[10px] select-none absolute text-sm">
                    Vui lòng điền email
                  </p>
                )}
              </div>
              <div className="flex">
                <div className="group-register mr-[10px]">
                  <input
                    id="phone"
                    type="number"
                    className="input-text peer px-[10px]"
                    placeholder="Số điện thoại"
                    value={inputPhoneNumber}
                    required
                    onChange={handleOnchangeInputPhoneNumber}
                  />
                </div>
                <div className="group-register">
                  <input
                    id="name"
                    type="text"
                    className="input-text peer px-[10px]"
                    placeholder="Họ tên"
                    required
                    value={inputName}
                    onChange={handleOnchangeInputName}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="group-register">
                  <input
                    id="password"
                    type="password"
                    className="input-text peer px-[10px]"
                    placeholder="Mật khẩu"
                    required
                    value={inputPassword}
                    onChange={handleOnchangeInputPassword}
                  />
                </div>
                {isPasswordStrength ? null : (
                  <p className="absolute text-red-500 text-sm mx-[10px]">
                    Mật khẩu phải có chữ hoa, thường, số, hơn 8 ký tự
                  </p>
                )}
              </div>

              <div className="group-register">
                <input
                  id="confirm"
                  type="password"
                  className="input-text peer px-[10px]"
                  placeholder="Xác nhận lại mật khẩu"
                  required
                  value={inputConfirm}
                  onChange={handleOnchangeInputConfirm}
                />
              </div>
              <button
                className="relative w-[100%] px-[15px] h-[50px] bg-gradient-to-r bottom-[-20%] from-blue-c-3 to-pink-c-2 text-white left-1/2 -translate-x-1/2 -translate-y-1/2 active:opacity-50 duration-200 rounded-[10px]"
                onClick={handleClickRegister}
              >
                Đăng ký
              </button>
            </div>
          )}

          {/*  */}
          <div className="absolute top-[0px] left-[0px] w-full h-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#909FEE] to-[#D292F3] w-[500px] h-[500px] rounded-full absolute -z-20 top-[-200px] left-[50%] -translate-x-1/2 rounded-radius-c"></div>
          </div>
        </div>
        <div
          className={
            isActive === "register"
              ? "absolute bottom-[30px] z-20 w-[70%] left-1/2 -translate-x-1/2"
              : "absolute bottom-[50px] z-20 w-[70%] left-1/2 -translate-x-1/2"
          }
        >
          <div
            className={
              isActive === "login" ? "change-form is-active" : "change-form"
            }
            onClick={() => handleOnChangeLogin()}
          >
            Đăng nhập
          </div>
          <div
            className={
              isActive === "register" ? "change-form is-active" : "change-form"
            }
            onClick={() => handleOnChangeRegister()}
          >
            Đăng ký
          </div>
        </div>
      </div>
    </div>
  );
}
