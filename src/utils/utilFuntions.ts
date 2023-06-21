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
    const checkSession = async () => {
      try {
        setLoading(true);
        const response = await instance.get(
          "api/services/app/Session/GetCurrentLoginInformations"
        );
        const user = response.data.result.user;
        const pathCurrent = location.pathname;
        setUser(user);
        if (pathCurrent === "/account/login") {
          user && navigate("/app");
        } else {
          !user && navigate("/account/login");
        }
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.log(err);
        navigate("/account/login");
      }
    };
    checkSession();
  }, [navigate, location, setLoading, setUser]);
}
