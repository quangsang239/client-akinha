import * as React from "react";

export interface INewPasswordProps {
  user: {
    name: string;
    verified: boolean;
    userName: string;
  };
}

export default function NewPassword({ user }: INewPasswordProps) {
  return (
    <div className="w-[70%] min-h-[500px] bg-white rounded-[10px] text-text-main">
      <div className="mx-[30px] mt-[20px]">
        <div className="py-[20px] border-b-2">
          <h3 className="mb-[10px]">Đổi mật khẩu</h3>
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="user" className="text-lg">
            Mật khẩu hiện tại
          </label>
          <input
            id="user"
            className="px-[10px] h-[50px] w-[60%] border-2 rounded-[10px] ml-[100px]"
            disabled
            value="quangsang239"
          />
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="user" className="text-lg">
            Mật khẩu mới
          </label>
          <input
            id="user"
            className="px-[10px] h-[50px] w-[60%] border-2 rounded-[10px] ml-[100px]"
            disabled
            value="quangsang239"
          />
        </div>
        <div className="py-[20px] border-b-2 flex items-center justify-between">
          <label htmlFor="user" className="text-lg">
            Xác nhận lại mật khẩu
          </label>
          <input
            id="user"
            className="px-[10px] h-[50px] w-[60%] border-2 rounded-[10px] ml-[100px]"
            disabled
            value="quangsang239"
          />
        </div>
        <button className="h-[50px] w-[60%] bg-main-color my-[20px] rounded-[10px] text-white text-lg relative float-right hover:opacity-70">
          Lưu thông tin
        </button>
      </div>
    </div>
  );
}
