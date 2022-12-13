import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import ManagerProfile from "../../components/layout/manager-profile";
import NewRoom from "../../components/layout/new-rom";
import { Loading } from "../../components/common/loading";
import { CreateNewRoomPayload } from "../../models";

export interface IViewAllProps {}

export default function ViewAll(props: IViewAllProps) {
  const router = useRouter();
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [dataRoom, setDataRoom] = useState<CreateNewRoomPayload | null>(null);
  const [user, setUser] = useState({
    userName: "",
    verified: false,
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    } else {
      router.replace("/login");
    }
  }, []);
  if (user.userName && user.userName.length > 0) {
    return (
      <div className="relative">
        <Header />
        <ManagerProfile
          setIsAddRoom={setIsAddRoom}
          isAddRoom={isAddRoom}
          user={user}
          setDataRoom={setDataRoom}
        />
        <Footer />
        {isAddRoom && (
          <NewRoom
            setIsAddRoom={setIsAddRoom}
            user={user}
            dataRoom={dataRoom}
            setDataRoom={setDataRoom}
          />
        )}
      </div>
    );
  } else return <Loading />;
}
