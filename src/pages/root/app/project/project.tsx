import {
  Box,
  Button,
  Stack,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { blue } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import { useEffect, useState, createContext } from "react";

import instance from "../../../../utils/instanceAPI";
import ProjectList from "../../../../components/List/ProjectList";
import ModalProject from "../../../../components/Modal/Project/Project";

export const clientListContext = createContext<null | any[]>(null);

export default function Projects() {
  const [projectStatus, setProjectStatus] = useState<"0" | "1" | "2">("0");
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [clientList, setClientList] = useState<null | any[]>(null);
  const [quantity, setQuantity] = useState<{
    "0": string;
    "1": string;
    "2": string;
  } | null>(null);

  const handChangeType = (e: SelectChangeEvent) =>
    setProjectStatus(e.target.value as "0" | "1" | "2");
  useEffect(() => {
    const fetchData = async () => {
      const responseQuantity = await instance.get(
        `api/services/app/Project/GetQuantityProject`
      );
      const quantityData = responseQuantity.data.result;
      setQuantity({
        "0": quantityData[0].quantity,
        "1": quantityData[1].quantity,
        "2": quantityData[0].quantity + quantityData[1].quantity,
      });
      const responseCustomer = await instance.get(
        `api/services/app/Customer/GetAll`
      );
      setClientList(responseCustomer.data.result);
      const responseProject = await instance.get(
        `api/services/app/Project/GetAll?status=${
          projectStatus === "2" ? "" : projectStatus
        }`
      );
      const projectData = responseProject.data.result;
      const customerArr: string[] = projectData.map(
        (el: any) => el.customerName
      );
      const customerList: string[] = [...new Set(customerArr)];
      const dataRender = customerList.map((customer, index) => {
        const projectOfCustomer: any[] = projectData.filter(
          (project: any, ind: number) => project.customerName === customer
        );
        return {
          customerName: customer,
          project: projectOfCustomer,
        };
      });
      setData(dataRender);
    };
    fetchData();
  }, [projectStatus]);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 16,
          width: "100%",
          height: "fit-content",
          maxHeight: "100%",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          overflowY: "scroll",
        }}
      >
        <clientListContext.Provider value={clientList}>
          <ModalProject
            open={openCreate}
            setOpen={setOpenCreate}
            type={"create"}
          />
        </clientListContext.Provider>
        <Box
          sx={{
            padding: "15px",
            borderBottom: "1px solid #ddd",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Manage Projects</Typography>
          <IconButton>
            <ReplayIcon />
          </IconButton>
        </Box>
        <Box sx={{ width: "100%", padding: "20px" }}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: blue[500], height: "80%" }}
                onClick={() => setOpenCreate(true)}
                disabled={!clientList}
              >
                <AddIcon /> New project
              </Button>
            </Box>
            <Box width="25%" sx={{ display: "flex", alignItems: "center" }}>
              <Select value={projectStatus} onChange={handChangeType} fullWidth>
                <MenuItem value={"0"}>{`Active Projects (${
                  quantity ? quantity[0] : "..."
                })`}</MenuItem>
                <MenuItem value={"1"}>
                  {`Deactive Projects (${quantity ? quantity[1] : "..."})`}
                </MenuItem>
                <MenuItem value={"2"}>{`All Projects (${
                  quantity ? quantity[2] : "..."
                })`}</MenuItem>
              </Select>
            </Box>
            <Box width="40%" sx={{ display: "flex", alignItems: "center" }}>
              <FormControl
                sx={{ m: 1, width: "100%", position: "relative" }}
                variant="outlined"
              >
                <SearchIcon
                  sx={{
                    position: "absolute",
                    height: 24,
                    width: 24,
                    color: "rgba(0,0,0,0.54)",
                    top: "50%",
                    left: "10px",
                    transform: "translate(0,-50%)",
                  }}
                />
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  sx={{ left: "30px" }}
                >
                  Search by client or projects name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  label="Search by client or projects name"
                  sx={{ pl: "30px", legend: { ml: "30px" } }}
                />
              </FormControl>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ width: "100%" }}>
          {data &&
            data.map((el: any, ind: number) => {
              return <ProjectList key={ind} data={el} />;
            })}
        </Box>
        {/* <Box sx={{ height: "1000px" }}></Box> */}
      </Box>
    </>
  );
}
