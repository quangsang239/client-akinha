import { useState } from "react";
import { toast } from "react-toastify";
import { authApi } from "../../api-client";
export interface INewPasswordProps {
  user: {
    name: string;
    verified: boolean;
    userName: string;
  };
}

export default function NewPassword({ user }: INewPasswordProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [isMatchPassword, setIsMatchPassword] = useState(true);
  const handleChangePassword = async () => {
    if (
      isPassword &&
      isMatchPassword &&
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0
    ) {
      await authApi
        .newPassword({
          userName: user.userName,
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
        .then((result: any) => {
          console.log(result);

          if (result && result?.data.code === 0) {
            toast.success(result?.data.message, { position: "top-center" });
            setConfirmPassword("");
            setCurrentPassword("");
            setNewPassword("");
          } else {
            toast.warning(result?.data.message, { position: "top-center" });
          }
        });
    } else {
      toast.warning("Vui lòng điền dầy đủ thông tin!", {
        position: "top-center",
      });
    }
  };
  return (
    <div className="w-[70%] min-h-[500px] bg-white rounded-[10px] text-text-main">
      <div className="mx-[30px] mt-[20px]">
        <div className="py-[20px] border-b-2">
          <h3 className="mb-[10px]">Đổi mật khẩu</h3>
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="currentPassword" className="text-lg">
            Mật khẩu hiện tại
          </label>
          <input
            id="currentPassword"
            type="password"
            className="px-[10px] h-[50px] w-[60%] border-2 rounded-[10px] ml-[100px]"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
          />
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="newPassword" className="text-lg">
            Mật khẩu mới
          </label>
          <div className="w-[60%] h-[50px]">
            <input
              id="newPassword"
              className="px-[10px] h-[50px] w-[100%] border-2 rounded-[10px]"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.currentTarget.value);
                if (e.currentTarget.value.length === 0) {
                  setIsPassword(true);
                } else {
                  if (
                    e.currentTarget.value.match(
                      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
                    )
                  ) {
                    setIsPassword(true);
                  } else {
                    setIsPassword(false);
                  }
                }
              }}
            />
            {isPassword ? null : (
              <p className="text-red-500 text-sm mx-[10px]">
                Mật khẩu phải có chữ hoa, thường, số, hơn 8 ký tự
              </p>
            )}
          </div>
        </div>

        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="confirmPassword" className="text-lg">
            Xác nhận lại mật khẩu
          </label>
          <div className="h-[50px] w-[60%] ml-[100px]">
            <input
              id="confirmPassword"
              className="px-[10px] h-[50px] w-[100%] border-2 rounded-[10px]"
              value={confirmPassword}
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.currentTarget.value);
                if (e.currentTarget.value.length === 0) {
                  setIsMatchPassword(true);
                } else {
                  if (e.currentTarget.value === newPassword) {
                    setIsMatchPassword(true);
                  } else {
                    setIsMatchPassword(false);
                  }
                }
              }}
            />
            {isMatchPassword ? null : (
              <p className="text-red-500 text-sm mx-[10px]">
                Mật khẩu mới không trùng khớp
              </p>
            )}
          </div>
        </div>
        <button
          className="h-[50px] w-[60%] bg-main-color my-[20px] rounded-[10px] text-white text-lg relative float-right hover:opacity-70"
          onClick={() => handleChangePassword()}
        >
          Lưu thông tin
        </button>
      </div>
    </div>
  );
}
