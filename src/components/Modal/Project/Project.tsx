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
export default function ModalProject(props: Props) {
  const { open, setOpen, type } = props;
  const [tab, setTab] = useState<number>(0);
  const [dataBranch, setDataBranch] = useState<null | any[]>(null);
  const [dataUser, setDataUser] = useState<null | any[]>(null);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      const responseBranch = await instance.get(
        "api/services/app/Branch/GetAllBranchFilter?isAll=true"
      );
      console.log(responseBranch.data.result);
      setDataBranch(responseBranch.data.result);
      const responseUser = await instance.get(
        "api/services/app/User/GetUserNotPagging"
      );
      console.log(responseUser.data.result);
      setDataUser(responseUser.data.result);
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
          <Box sx={{ overflowY: "auto" }}>
            {tab === 0 && <GeneralTab />}
            {tab === 1 && (
              <dataBranchContext.Provider value={dataBranch}>
                <dataUserContext.Provider value={dataUser}>
                  <TeamTab />
                </dataUserContext.Provider>
              </dataBranchContext.Provider>
            )}
            {tab === 2 && <TasksTab />}
            {tab === 3 && <NotificationTab />}
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <ButtonGroup>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="info">
                Save
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
