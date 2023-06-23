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
  ListItemText,
  ListItem,
  IconButton,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";

import { useContext, useEffect, useState } from "react";
import { dataBranchContext, dataUserContext } from "./Project";
import { blue, green, red } from "@mui/material/colors";

export default function TeamTab() {
  const [openTeam, setOpenTeam] = useState<boolean>(true);
  const [openSelect, setOpenSelect] = useState(true);
  const dataBranch = useContext(dataBranchContext);
  const dataUser = useContext(dataUserContext);
  const [branchSelected, setBranchSelected] = useState<string>("All");
  const [typeSelected, setTypeSelected] = useState<number>(3);
  const [userRender, setUserRender] = useState<null | any[]>(null);
  //   type =[0,1,2,null]

  useEffect(() => {
    const usersRenderr: any[] | null = dataUser
      ? dataUser.map((el, ind) => {
          return { ...el, isSelected: false };
        })
      : null;
    setUserRender(usersRenderr);
  }, [dataUser]);
  const handleSelectUser = (user: any) => {
    const index = dataUser && userRender?.findIndex((el) => el.id === user.id);
    setUserRender((b: null | any[]) => {
      if (b && index) {
        const bUpdate = [...b];
        if (index !== -1 && index < bUpdate.length) {
          bUpdate[index].isSelected = true;
        }
        return bUpdate;
      } else return b;
    });
  };
  const handleUnSelectUser = (user: any) => {
    const index = dataUser && userRender?.findIndex((el) => el.id === user.id);
    setUserRender((b: null | any[]) => {
      if (b && index) {
        const bUpdate = [...b];
        if (index !== -1 && index < bUpdate.length) {
          bUpdate[index].isSelected = false;
        }
        return bUpdate;
      } else return b;
    });
  };
  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", height: "100%" }}
    >
      <Box sx={{ width: "55%", p: 2 }}>
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
        <Collapse
          in={openSelect}
          sx={{
            height: "100%",
            ".MuiCollapse-wrapper": {
              height: "100%",
            },
          }}
          timeout="auto"
          unmountOnExit
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr",
              height: "100%",
            }}
          >
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
            <Box
              sx={{
                height: "100%",
                maxHeight: "520px",
                overflowY: "auto",
              }}
            >
              <List>
                {dataUser &&
                  userRender
                    ?.filter((user) => user.isSelected)
                    .map((user, index) => {
                      return (
                        <ListItem
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#f9f9f9" : "white",
                          }}
                        >
                          <ListItemIcon>
                            <IconButton
                              onClick={() => handleUnSelectUser(user)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemIcon>
                          <Avatar alt="" src={user.avatarFullPath} />
                          <ListItemText
                            sx={{ ml: 2 }}
                            primary={user.name}
                            secondary={user.emailAddress}
                          />
                          {user.type === 0 && (
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={"white"}
                              component={"div"}
                              sx={{
                                backgroundColor: red[500],
                                px: 1,
                                borderRadius: 4,
                              }}
                            >
                              Staff
                            </Typography>
                          )}
                          {user.type === 1 && (
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={"white"}
                              component={"div"}
                              sx={{
                                backgroundColor: green[500],
                                px: 1,
                                borderRadius: 4,
                              }}
                            >
                              Internship
                            </Typography>
                          )}
                          {user.type === 2 && (
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={"white"}
                              component={"div"}
                              sx={{
                                backgroundColor: blue[500],
                                px: 1,
                                borderRadius: 4,
                              }}
                            >
                              Collaborator
                            </Typography>
                          )}
                        </ListItem>
                      );
                    })}
              </List>
            </Box>
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          width: "45%",
          p: 2,
          display: "grid",
          gridTemplateRows: "auto 1fr",
        }}
      >
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
        <Collapse
          in={openSelect}
          sx={{
            height: "100%",
            ".MuiCollapse-wrapper": {
              height: "100%",
            },
          }}
          timeout="auto"
          unmountOnExit
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr",
              height: "100%",
            }}
          >
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
            <Box
              sx={{
                height: "100%",
                maxHeight: "520px",
                overflowY: "auto",
              }}
            >
              <List>
                {dataUser &&
                  userRender
                    ?.filter((user) => !user.isSelected)
                    .map((user, index) => {
                      return (
                        <ListItemButton
                          key={index}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? "#f9f9f9" : "white",
                          }}
                          onClick={() => handleSelectUser(user)}
                        >
                          <ListItemIcon>
                            <ArrowBackIosNewIcon />
                          </ListItemIcon>
                          <Avatar alt="" src={user.avatarFullPath} />
                          <ListItemText
                            sx={{ ml: 2 }}
                            primary={user.name}
                            secondary={user.emailAddress}
                          />
                          {user.type === 0 && (
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={"white"}
                              component={"div"}
                              sx={{
                                backgroundColor: red[500],
                                px: 1,
                                borderRadius: 4,
                              }}
                            >
                              Staff
                            </Typography>
                          )}
                          {user.type === 1 && (
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={"white"}
                              component={"div"}
                              sx={{
                                backgroundColor: green[500],
                                px: 1,
                                borderRadius: 4,
                              }}
                            >
                              Internship
                            </Typography>
                          )}
                          {user.type === 2 && (
                            <Typography
                              fontSize={12}
                              fontWeight={600}
                              color={"white"}
                              component={"div"}
                              sx={{
                                backgroundColor: blue[500],
                                px: 1,
                                borderRadius: 4,
                              }}
                            >
                              Collaborator
                            </Typography>
                          )}
                        </ListItemButton>
                      );
                    })}
              </List>
            </Box>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
