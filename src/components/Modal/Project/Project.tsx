import {
  Modal,
  Box,
  Typography,
  Tab,
  Tabs,
  ButtonGroup,
  Button,
} from "@mui/material";
import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm, FormProvider } from "react-hook-form";

import GeneralTab from "./GeneralTab";
import TeamTab from "./TeamTab";
import TasksTab from "./TasksTab";
import NotificationTab from "./NotificationTab";
import instance from "../../../utils/instanceAPI";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "create" | "edit";
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const dataBranchContext = createContext<null | any[]>(null);
export const dataUserContext = createContext<null | any[]>(null);
interface UserRender {
  name: string;
  emailAddress: string;
  isActive: true;
  type: 0 | 1 | 2 | null;
  jobTitle: null;
  level: number;
  userCode: string;
  avatarPath: string;
  avatarFullPath: string;
  branch: null;
  branchColor: string;
  branchDisplayName: string;
  branchId: number;
  id: number;
  isSelected: boolean;
  projectType: 0 | 1 | 2 | 3 | null;
}
interface formData {
  name: string;
  code: string;
  // status: number;
  timeStart: string | null;
  timeEnd: string | null;
  note: string;
  projectType: number;
  customerId: number;
  tasks:
    | {
        taskId: number;
        billable: boolean;
      }[]
    | [];
  users:
    | {
        userId: number;
        type: number;
      }[]
    | [];
  projectTargetUsers: [];
  // komuChannelId: string;
  // isNotifyToKomu: boolean;
  isAllUserBelongTo: boolean;
}
const formDataInit: formData = {
  name: "",
  code: "",
  // status: 0,
  timeStart: null,
  timeEnd: null,
  note: "",
  projectType: 0,
  customerId: 0,
  tasks: [],
  users: [],
  projectTargetUsers: [],
  // komuChannelId: "",
  // isNotifyToKomu: true,
  isAllUserBelongTo: true,
};
export const formDataContext = createContext<{
  formData: formData;
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
} | null>(null);
export default function ModalProject(props: Props) {
  const { open, setOpen, type } = props;
  const [tab, setTab] = useState<number>(0);
  const [dataBranch, setDataBranch] = useState<null | any[]>(null);
  const [dataUser, setDataUser] = useState<null | any[]>(null);
  const [dataTask, setDataTask] = useState<
    | null
    | {
        name: string;
        type: number;
        isDeleted: boolean;
        id: number;
      }[]
  >(null);
  const [userRender, setUserRender] = useState<null | UserRender[]>(null);
  const methods = useForm({ defaultValues: formDataInit });
  const onSubmit = (data: formData) => {
    if (data.tasks.length === 0) {
      methods.setError("tasks", { type: "manual", message: "Required task" });
      console.log(methods.formState.errors);
    } else {
      if (data.users.length === 0) {
        methods.setError("users", {
          type: "manual",
          message: "Require member for project!",
        });
        console.log(methods.formState.errors);
      } else {
        if (
          !data.timeStart ||
          !data.timeEnd ||
          dayjs(data.timeEnd) < dayjs(data.timeStart)
        ) {
          methods.setError("timeEnd", { message: "time not valid" });
          methods.setError("timeStart", { message: "time not valid" });
        } else {
          console.log(data);
        }
      }
    }
  };
  useEffect(() => {
    if (dataTask) {
      methods.setValue(
        "tasks",
        dataTask.map((el) => {
          return { taskId: el.id, billable: true };
        })
      );
    }
  }, [dataTask, methods]);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const usersRenderr: UserRender[] | null = dataUser
      ? dataUser.map((el, ind) => {
          return { ...el, isSelected: false, projectType: null };
        })
      : null;
    setUserRender(usersRenderr);
  }, [dataUser]);
  useEffect(() => {
    const fetchData = async () => {
      const responseBranch = await instance.get(
        "api/services/app/Branch/GetAllBranchFilter?isAll=true"
      );
      setDataBranch(responseBranch.data.result);
      const responseUser = await instance.get(
        "api/services/app/User/GetUserNotPagging"
      );
      setDataUser(responseUser.data.result);
      const responseTask = await instance.get("api/services/app/Task/GetAll");
      setDataTask(responseTask.data.result);
    };
    fetchData();
  }, []);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "70px",
          left: "50%",
          transform: "translate(-50%, 0%)",
          width: 1200,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          height: "90vh",
          maxHeight: "870px",
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateRows: "auto auto 1fr auto",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                component="h2"
                fontSize={30}
                fontWeight={600}
                sx={{
                  borderBottom: "1px solid #ddd",
                  pb: 2,
                }}
              >
                {type === "create" && "Create Project"}
                {type === "edit" && "Edit Project"}
              </Typography>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="General"
                    sx={{ textTransform: "none" }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Team"
                    sx={{ textTransform: "none" }}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Tasks"
                    sx={{ textTransform: "none" }}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label="Notification"
                    sx={{ textTransform: "none" }}
                    {...a11yProps(3)}
                  />
                </Tabs>
              </Box>
              <Box sx={{ height: "100%", overflowY: "auto" }}>
                {tab === 0 && <GeneralTab />}
                {tab === 1 && (
                  <dataBranchContext.Provider value={dataBranch}>
                    <dataUserContext.Provider value={dataUser}>
                      <TeamTab
                        userRender={userRender}
                        setUserRender={setUserRender}
                      />
                    </dataUserContext.Provider>
                  </dataBranchContext.Provider>
                )}
                {tab === 2 && <TasksTab dataTask={dataTask} />}
                {tab === 3 && <NotificationTab />}
              </Box>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <ButtonGroup>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setOpen(false)}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    type="submit"
                    disabled={
                      Object.keys(methods.formState.errors).length !== 0
                    }
                  >
                    Save
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
