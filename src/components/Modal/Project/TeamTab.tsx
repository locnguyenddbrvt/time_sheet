import {
  Box,
  Typography,
  Collapse,
  ListItemButton,
  ListItemIcon,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  List,
  Avatar,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useContext, useEffect, useState } from "react";
import { dataBranchContext, dataUserContext } from "./Project";

export default function TeamTab() {
  const [openTeam, setOpenTeam] = useState<boolean>(true);
  const [openSelect, setOpenSelect] = useState(true);
  const dataBranch = useContext(dataBranchContext);
  const dataUser = useContext(dataUserContext);
  const [branchSelected, setBranchSelected] = useState<string>("All");
  const [typeSelected, setTypeSelected] = useState<number>(3);
  const [userRender, setUserRender] = useState<null | any[]>(null);
  //   type =[0,1,2,null]
  //   useEffect(() => {
  //     const test: any = dataUser?.map((el, ind) => {
  //       return el.type;
  //     });
  //     const tesstt: any = [...new Set(test)];
  //     // console.log(tesstt);
  //   }, [dataUser]);
  useEffect(() => {
    const usersRenderr: any[] | null = dataUser
      ? dataUser.map((el, ind) => {
          return { ...el, isSelected: false };
        })
      : null;
    setUserRender(usersRenderr);
  }, [dataUser]);
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", height: "100%" }}
    >
      <Box sx={{ width: "65%", p: 2 }}>
        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 1,
          }}
          onClick={() => setOpenTeam((b) => !b)}
        >
          <Typography fontWeight={600}>Team</Typography>
          <ListItemIcon>
            {openTeam ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={openTeam} timeout="auto" unmountOnExit>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Show deactive member"
            />
            <FormControl
              sx={{ width: "100%", position: "relative" }}
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
                sx={{
                  pl: "30px",
                  legend: { ml: "30px" },
                }}
              />
            </FormControl>
          </Box>
          <Box></Box>
        </Collapse>
      </Box>
      <Box sx={{ width: "35%", p: 2 }}>
        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: 1,
          }}
          onClick={() => setOpenSelect((b) => !b)}
        >
          <Typography fontWeight={600}>Select team menber</Typography>
          <ListItemIcon>
            {openSelect ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </ListItemButton>
        <Collapse in={openSelect} timeout="auto" unmountOnExit>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={1}
          >
            <FormControl sx={{ width: "25%" }}>
              <InputLabel id="demo-simple-select-label">Branch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={branchSelected}
                label="Branch"
                onChange={(e) => setBranchSelected(e.target.value)}
              >
                {dataBranch &&
                  dataBranch.map((branch, ind) => {
                    return (
                      <MenuItem key={branch.name} value={branch.name}>
                        {branch.displayName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "25%" }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeSelected}
                label="Branch"
                onChange={(e) => setTypeSelected(Number(e.target.value))}
              >
                <MenuItem value={3}>All</MenuItem>
                <MenuItem value={0}>Staff</MenuItem>
                <MenuItem value={1}>Internship</MenuItem>
                <MenuItem value={2}>Collaborator</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ width: "50%", position: "relative" }}
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
                Name or email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="Name or email"
                sx={{
                  pl: "30px",
                  legend: { ml: "30px" },
                }}
              />
            </FormControl>
          </Box>
          <Box>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowBackIosNewIcon />
                </ListItemIcon>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemButton>
            </List>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
