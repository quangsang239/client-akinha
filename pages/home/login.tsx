import { useState } from "react";

interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [isActive, setIsActive] = useState("login");
  const handleOnChangeLogin = () => {
    setIsActive("login");
  };
  const handleOnChangeRegister = () => {
    setIsActive("register");
  };
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-c-1 to-pink-c-1 w-screen h-screen">
      <div className="absolute before:z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-[70%] before:absolute before:bottom-1/2 before:left-[80%] before:content-[''] before:w-600 before:h-600 before:bg-gradient-to-tr before:from-blue-c-2 before:to-purple-c-1 before:rounded-[999px] before:animate-background-animation after:absolute after:top-[40%] after:right-[60%] after:content-[''] after:w-[400px] after:h-[400px] after:bg-gradient-to-tr after:from-blue-c-2 after:to-purple-c-1 after:rounded-[999px] after:blur-[10px] after:animate-background-animation after:delay-200 after:z-10">
        <div
          className="bg-[#EFEFEF] relative bg-opacity-50 z-20 w-full h-full overflow-hidden rounded-[30px]"
          id="form"
        >
          {/* This code here for login */}
          {isActive === "login" ? (
            <div className="w-[80%] p-[10%] h-[60%] absolute left-1/2 -translate-x-1/2 z-10 transition duration-[200s] ease-in-out">
              <h1 className="text-white mb-[50px] text-center">Login</h1>
              <div className="group-login">
                <input
                  type="text"
                  className="input-text peer px-[10px]"
                  placeholder=" "
                  required
                  id="username"
                />
                <label
                  htmlFor="username"
                  className="label peer-focus:top-[0px] peer-focus:left-[5%] peer-valid:top-[0px] peer-valid:left-[5%]"
                >
                  Username
                </label>
              </div>
              <div className="group-login">
                <input
                  id="password"
                  type="password"
                  className="input-text peer px-[10px]"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="password"
                  className="label peer-focus:top-[0px] peer-focus:left-[5%] peer-valid:top-[0px] peer-valid:left-[5%]"
                >
                  Password
                </label>
              </div>
              <button className="relative w-[80%] px-[15px] h-[40px] bg-gradient-to-r bottom-[-20%] from-blue-c-3 to-pink-c-2 text-white left-1/2 -translate-x-1/2 -translate-y-1/2 active:opacity-50 duration-200">
                Login
              </button>
            </div>
          ) : (
            // This code here for register
            <div className="w-[80%] p-[10%] h-[60%] absolute left-1/2 -translate-x-1/2 z-10 ">
              <h1 className="text-white mb-[10px] text-center">Register</h1>
              <div className="group-register">
                <input
                  id="username"
                  type="text"
                  className="input-text peer px-[10px]"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="username"
                  className="label peer-focus:top-[7px] peer-focus:left-[5%] peer-valid:top-[7px] peer-valid:left-[5%]"
                >
                  Username
                </label>
              </div>
              <div className="group-register">
                <input
                  id="email"
                  type="text"
                  className="input-text peer px-[10px]"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="email"
                  className="label peer-focus:top-[7px] peer-focus:left-[5%] peer-valid:top-[7px] peer-valid:left-[5%]"
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
                />
                <label
                  htmlFor="password"
                  className="label peer-focus:top-[7px] peer-focus:left-[5%] peer-valid:top-[7px] peer-valid:left-[5%]"
                >
                  Password
                </label>
              </div>
              <div className="group-register">
                <input
                  id="confirm"
                  type="password"
                  className="input-text peer px-[10px]"
                  placeholder=""
                  required
                />
                <label
                  htmlFor="confirm"
                  className="label peer-focus:top-[7px] peer-focus:left-[5%] peer-valid:top-[7px] peer-valid:left-[5%]"
                >
                  Confirm Password
                </label>
              </div>
              <button className="relative w-[80%] px-[15px] h-[40px] bg-gradient-to-r bottom-[-20%] from-blue-c-3 to-pink-c-2 text-white left-1/2 -translate-x-1/2 -translate-y-1/2 active:opacity-50 duration-200">
                Register
              </button>
            </div>
          )}

          {/*  */}
          <div className="absolute top-[0px] left-[0px] w-full h-full overflow-hidden">
            <div className="bg-gradient-to-r from-[#909FEE] to-[#D292F3] w-[500px] h-[500px] rounded-full absolute -z-20 top-[-200px] left-[50%] -translate-x-1/2 rounded-radius-c"></div>
          </div>
        </div>
        <div className="absolute bottom-[10px] z-20 w-[70%] left-1/2 -translate-x-1/2">
          <div
            className={
              isActive === "login" ? "change-form is-active" : "change-form"
            }
            onClick={() => handleOnChangeLogin()}
          >
            Login
          </div>
          <div
            className={
              isActive === "register" ? "change-form is-active" : "change-form"
            }
            onClick={() => handleOnChangeRegister()}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
}
