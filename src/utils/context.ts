import { createContext } from "react";

export const loadingContext = createContext<boolean>(false);

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
export const userContext = createContext<{
  userCurr: null | User;
  setUserCurr: React.Dispatch<React.SetStateAction<null | User>>;
}>({
  userCurr: null,
  setUserCurr: () => {},
});

// const user = {
//   name: "admin",
//   surname: "admin",
//   userName: "admin",
//   emailAddress: "admin@aspnetboilerplate.com",
//   allowedLeaveDay: null,
//   type: null,
//   level: null,
//   sex: null,
//   branch: null,
//   avatarPath: "/avatars/1685940394016_admin_image.jpg",
//   avatarFullPath:
//     "http://training-api-timesheet.nccsoft.vn/avatars/1685940394016_admin_image.jpg",
//   morningWorking: "3.5",
//   morningStartAt: "01:00",
//   morningEndAt: "04:30",
//   afternoonWorking: "4",
//   afternoonStartAt: "13:00",
//   afternoonEndAt: "17:00",
//   isWorkingTimeDefault: false,
//   branchId: 0,
//   id: 40894,
// };
