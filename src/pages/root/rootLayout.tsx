import { Outlet } from "react-router-dom";
import { useState } from "react";

import { useGetSession } from "../../utils/utilFuntions";
import { loadingContext, userContext } from "../../utils/context";
import LoadingPage from "../loading/loadingPage";

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
export default function RootLayout() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userCurr, setUserCurr] = useState<null | User>(null);

  useGetSession(setUserCurr, setLoading);
  return (
    <loadingContext.Provider value={loading}>
      <userContext.Provider value={{ userCurr, setUserCurr }}>
        {loading ? <LoadingPage /> : <Outlet />}
      </userContext.Provider>
    </loadingContext.Provider>
  );
}
