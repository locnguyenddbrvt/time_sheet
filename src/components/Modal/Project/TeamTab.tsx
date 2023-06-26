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
  Stack,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useFormContext, Controller } from "react-hook-form";

import { useContext, useState, Suspense, lazy, useEffect } from "react";
import { dataBranchContext, dataUserContext } from "./Project";
import { LoadingRight } from "./UI/RightUI";
import { LoadingLeft } from "./UI/LeftUI";

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
interface TeamLabProps {
  userRender: null | UserRender[];
  setUserRender: React.Dispatch<React.SetStateAction<any[] | null>>;
}
interface RightUIComponentLazyProps {
  userRender: UserRender[] | null;
  handleSelectUser: (user: UserRender) => void;
}
interface LeftUIComponentLazyProps {
  userRender: UserRender[] | null;
  setUserRender: React.Dispatch<React.SetStateAction<any[] | null>>;
  handleUnSelectUser: (user: UserRender) => void;
}
export default function TeamTab(props: TeamLabProps) {
  const [openTeam, setOpenTeam] = useState<boolean>(true);
  const [openSelect, setOpenSelect] = useState(true);
  const dataBranch = useContext(dataBranchContext);
  const dataUser = useContext(dataUserContext);
  const [branchSelected, setBranchSelected] = useState<string>("All");
  const [typeSelected, setTypeSelected] = useState<number>(3);
  const { userRender, setUserRender } = props;
  const [RightUILazy, setRightUILazy] =
    useState<null | React.ComponentType<RightUIComponentLazyProps> | null>(
      null
    );
  const [LeftUILazy, setLeftUILazy] =
    useState<null | React.ComponentType<LeftUIComponentLazyProps> | null>(null);
  const { control } = useFormContext();

  useEffect(() => {
    if (openSelect) {
      const loadComponent = async () => {
        const RightUIComponentLazy = await lazy(() => import("./UI/RightUI"));
        setRightUILazy(RightUIComponentLazy);
      };
      loadComponent();
    }
    if (openTeam) {
      const loadComponent = async () => {
        const LeftUIComponentLay = await lazy(() => import("./UI/LeftUI"));
        setLeftUILazy(LeftUIComponentLay);
      };
      loadComponent();
    }
  }, [openSelect, openTeam]);

  const handleSelectUser = (
    user: UserRender,
    onChange: (event: any) => void
  ) => {
    const index = dataUser && userRender?.findIndex((el) => el.id === user.id);
    setUserRender((b: null | UserRender[]) => {
      if ((b && index) || (b && index === 0)) {
        const bUpdate = [...b];
        if (index !== -1 && index < bUpdate.length) {
          bUpdate[index].isSelected = true;
          bUpdate[index].projectType = 0;
        }
        onChange(
          bUpdate
            .filter((el) => el.isSelected)
            .map((el) => {
              return { userId: el.id, type: el.projectType };
            })
        );
        return bUpdate;
      } else return b;
    });
  };
  const handleUnSelectUser = (
    user: UserRender,
    onChange: (event: any) => void
  ) => {
    const index = dataUser && userRender?.findIndex((el) => el.id === user.id);
    setUserRender((b: null | UserRender[]) => {
      if ((b && index) || (b && index === 0)) {
        const bUpdate = [...b];
        if (index !== -1 && index < bUpdate.length) {
          bUpdate[index].isSelected = false;
          bUpdate[index].projectType = null;
        }
        onChange(
          bUpdate
            .filter((el) => el.isSelected)
            .map((el) => {
              return { userId: el.id, type: el.projectType };
            })
        );
        return bUpdate;
      } else return b;
    });
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", height: "100%" }}
    >
      <Controller
        name="users"
        control={control}
        render={({ field: { onChange } }) => (
          <>
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
                in={openTeam}
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
                    {LeftUILazy && (
                      <Suspense fallback={<LoadingLeft />}>
                        <LeftUILazy
                          userRender={userRender}
                          setUserRender={setUserRender}
                          handleUnSelectUser={(user: UserRender) =>
                            handleUnSelectUser(user, onChange)
                          }
                        />
                      </Suspense>
                    )}
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
                      <InputLabel id="demo-simple-select-label">
                        Branch
                      </InputLabel>
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
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeSelected}
                        label="Branch"
                        onChange={(e) =>
                          setTypeSelected(Number(e.target.value))
                        }
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
                  <Stack
                    sx={{
                      height: "100%",
                      maxHeight: "520px",
                      overflowY: "auto",
                    }}
                  >
                    {RightUILazy && (
                      <Suspense fallback={<LoadingRight />}>
                        <RightUILazy
                          userRender={userRender}
                          handleSelectUser={(user: UserRender) =>
                            handleSelectUser(user, onChange)
                          }
                        />
                      </Suspense>
                    )}
                  </Stack>
                </Box>
              </Collapse>
            </Box>
          </>
        )}
      />
    </Box>
  );
}
