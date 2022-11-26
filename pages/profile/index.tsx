import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import ManagerProfile from "../../components/layout/manager-profile";
import NewRoom from "../../components/layout/new-rom";
import { Loading } from "../../components/common/loading";
import useSWR from "swr";

export interface IViewAllProps {}

export default function ViewAll(props: IViewAllProps) {
  const router = useRouter();
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [user, setUser] = useState({
    userName: "",
    verified: false,
    name: "",
    phoneNumber: "",
  });
  const { data } = useSWR(`/user/get-profile/${user.userName}`, {
    dedupingInterval: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    } else {
      router.replace("/login");
    }
  }, []);
  if (user.userName.length > 0) {
    return (
      <div className="relative">
        <Header user={user} />
        <ManagerProfile setIsAddRoom={setIsAddRoom} user={user} />
        <Footer />
        {isAddRoom && (
          <NewRoom setIsAddRoom={setIsAddRoom} user={data?.data.user} />
        )}
      </div>
    );
  } else return <Loading />;
}
