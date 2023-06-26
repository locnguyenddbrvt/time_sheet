import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import instance from "./instanceAPI";

interface User {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  allowedLeaveDay: null;
  type: null;
  level: null;
  sex: null;
  branch: null;
  avatarPath: string;
  avatarFullPath: string;
  morningWorking: string;
  afternoonWorking: "4";
  afternoonStartAt: "13:00";
  afternoonEndAt: "17:00";
  isWorkingTimeDefault: false;
  branchId: 0;
  id: number;
}
export async function useGetSession(
  setUser: React.Dispatch<React.SetStateAction<null | User>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchSession = async () => {
      await instance
        .get("api/services/app/Session/GetCurrentLoginInformations")
        .then((response) => {
          const pathCurrent = location.pathname;
          const user = response.data.result.user;
          if (!user && pathCurrent !== "/account/login") {
            navigate("/account/login");
          }
          if (user) {
            setUser(user);
            pathCurrent === "/account/login" && navigate("/app/project");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };
    fetchSession();
  }, [navigate, location, setLoading, setUser]);
}
