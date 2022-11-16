import { useState, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";

import { authApi } from "../api-client";

interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [isActive, setIsActive] = useState("login");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputConfirm, setInputConfirm] = useState("");
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
    setInputPassword(e.currentTarget.value);
  };
  const handleOnchangeInputEmail = (e: FormEvent<HTMLInputElement>) => {
    setInputEmail(e.currentTarget.value);
  };
  const handleOnchangeInputConfirm = (e: FormEvent<HTMLInputElement>) => {
    setInputConfirm(e.currentTarget.value);
  };
  useEffect(() => {}, []);
  const handleClickLogin = async () => {
    try {
      const data = await authApi.login({
        userName: inputUsername,
        password: inputPassword,
      });
      console.log(data);

      if (data.data.code === 0) {
        toast.success(`${data.data.message}`);
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: data.data.userName,
            verified: data.data.verified,
          })
        );
      } else {
        toast.error(`${data.data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickRegister = () => {};
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-c-1 to-pink-c-1 w-screen h-screen">
      <div className={isActive === "login" ? "form-login" : "form-register"}>
        <div
          className="bg-[#EFEFEF] relative bg-opacity-50 z-20 w-full h-full overflow-hidden rounded-[30px]"
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
                  placeholder=" "
                  required
                  value={inputUsername}
                  id="username"
                  onChange={handleOnchangeInputUsername}
                />
                <label
                  htmlFor="username"
                  className="label peer-focus:top-[0px] peer-focus:left-[5%] peer-valid:top-[0px] peer-valid:left-[5%]"
                >
                  Tài khoản
                </label>
              </div>
              <div className="group-login">
                <input
                  id="password"
                  type="password"
                  className="input-text peer px-[10px]"
                  placeholder=""
                  required
                  value={inputPassword}
                  onChange={handleOnchangeInputPassword}
                />
                <label
                  htmlFor="password"
                  className="label peer-focus:top-[0px] peer-focus:left-[5%] peer-valid:top-[0px] peer-valid:left-[5%]"
                >
                  Mật khẩu
                </label>
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
            <div className="w-[80%] p-[10%] h-[60%] absolute left-1/2 -translate-x-1/2 z-10 ">
              <h1 className="text-white mb-[0px] text-center">Đăng ký</h1>
              <div className="group-register">
                <input
                  id="username"
                  type="text"
                  className="input-text peer px-[10px]"
                  placeholder=" "
                  required
                  value={inputUsername}
                  onChange={handleOnchangeInputUsername}
                />
                <label
                  htmlFor="username"
                  className="label peer-focus:top-[2px] peer-focus:left-[5%] peer-valid:top-[2px] peer-valid:left-[5%]"
                >
                  Tài khoản
                </label>
              </div>
              <div className="group-register">
                <input
                  id="email"
                  type="text"
                  className="input-text peer px-[10px]"
                  placeholder=""
                  required
                  value={inputEmail}
                  onChange={handleOnchangeInputEmail}
                />
                <label
                  htmlFor="email"
                  className="label peer-focus:top-[2px] peer-focus:left-[5%] peer-valid:top-[2px] peer-valid:left-[5%]"
                >
                  Email
                </label>
              </div>
              <div className="group-register">
                <input
                  id="password"
                  type="password"
                  className="input-text peer px-[10px]"
                  placeholder=""
                  required
                  value={inputPassword}
                  onChange={handleOnchangeInputPassword}
                />
                <label
                  htmlFor="password"
                  className="label peer-focus:top-[2px] peer-focus:left-[5%] peer-valid:top-[2px] peer-valid:left-[5%]"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="group-register">
                <input
                  id="confirm"
                  type="password"
                  className="input-text peer px-[10px]"
                  placeholder=""
                  required
                  value={inputConfirm}
                  onChange={handleOnchangeInputConfirm}
                />
                <label
                  htmlFor="confirm"
                  className="label peer-focus:top-[2px] peer-focus:left-[5%] peer-valid:top-[2px] peer-valid:left-[5%]"
                >
                  Xác nhận mật khẩu
                </label>
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
              ? "absolute bottom-[50px] z-20 w-[70%] left-1/2 -translate-x-1/2"
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
