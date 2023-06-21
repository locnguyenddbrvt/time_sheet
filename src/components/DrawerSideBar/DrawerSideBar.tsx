import {
  Drawer,
  Box,
  Avatar,
  Typography,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import HomeIcon from "@mui/icons-material/Home";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import GroupsIcon from "@mui/icons-material/Groups";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleIcon from "@mui/icons-material/Article";
import RateReviewIcon from "@mui/icons-material/RateReview";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Fragment, useState } from "react";
import { blue } from "@mui/material/colors";

const navData = [
  {
    title: "Home page",
    icon: <HomeIcon />,
    isNested: false,
  },
  {
    title: "Admin",
    icon: <ColorLensIcon />,
    isNested: true,
    children: [
      { title: "User", icon: <GroupIcon /> },
      { title: "Roles", icon: <LocalOfferIcon /> },
      { title: "Configuration", icon: <ConfirmationNumberIcon /> },
      { title: "Clients", icon: <PeopleOutlineIcon /> },
      { title: "Tasks", icon: <ColorLensIcon /> },
      { title: "Leave types", icon: <ColorLensIcon /> },
      { title: "Branches", icon: <ColorLensIcon /> },
    ],
  },
  {
    title: "Projects",
    icon: <AccountTreeIcon />,
    isNested: false,
  },
  {
    title: "My timesheets",
    icon: <AccessAlarmIcon />,
    isNested: false,
  },
  {
    title: "Timesheets",
    icon: <DateRangeIcon />,
    isNested: false,
  },
  {
    title: "Timesheets monitoring",
    icon: <SupervisedUserCircleIcon />,
    isNested: false,
  },
  {
    title: "My leave days / onsite",
    icon: <EventBusyIcon />,
    isNested: false,
  },
  {
    title: "Manage team working calendar",
    icon: <ChecklistRtlIcon />,
    isNested: false,
  },
  {
    title: "Team working calendar",
    icon: <GroupsIcon />,
    isNested: false,
  },
  {
    title: "Setting off days",
    icon: <DateRangeIcon />,
    isNested: false,
  },
  {
    title: "Overtime settings",
    icon: <DateRangeIcon />,
    isNested: false,
  },
  {
    title: "My working time",
    icon: <DateRangeIcon />,
    isNested: false,
  },
  {
    title: "Manage working times",
    icon: <AccessTimeIcon />,
    isNested: false,
  },
  {
    title: "Report",
    icon: <ArticleIcon />,
    isNested: true,
    children: [{ title: "User", icon: <ColorLensIcon /> }],
  },
  {
    title: "Review Interns",
    icon: <RateReviewIcon />,
    isNested: false,
  },
];

interface DrawerSideBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function DrawerSideBar(props: DrawerSideBarProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const { open, setOpen } = props;

  // Handle toggle nested nav
  const [openNested, setOpenNested] = useState<string | null>(null);
  const handleOpenNested = (title: string) => {
    if (openNested) {
      setOpenNested(null);
      openNested !== title && setOpenNested(title);
    } else setOpenNested(title);
  };

  return (
    <Drawer
      anchor="left"
      open={isLargeScreen ? true : open}
      variant={isLargeScreen ? "persistent" : "temporary"}
      onClose={() => setOpen(false)}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
        width={300}
        pt={"64px"}
      >
        <Box>
          <div className="user-infor-tag">
            <Box
              sx={{
                px: "15px",
                pt: "13px",
                pb: "12px",
                display: "flex",
                alignItems: "center",
                gap: 2,
                position: "relative",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                sx={{ width: 60, height: 60 }}
                src="http://training-api-timesheet.nccsoft.vn/avatars/1685940394016_admin_image.jpg"
              />
              <Box>
                <Typography color="white" fontSize={14}>
                  admin admin
                </Typography>
                <Typography color="white" fontSize={14}>
                  admin@aspnetboilerplate.com
                </Typography>
              </Box>
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "white",
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </div>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {navData.map((el, index) => {
              if (el.isNested) {
                return (
                  <Fragment key={index}>
                    <ListItemButton onClick={() => handleOpenNested(el.title)}>
                      <ListItemIcon>{el.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography fontWeight={700} fontSize={14}>
                            {el.title}
                          </Typography>
                        }
                      />
                      {openNested === el.title ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openNested === el.title}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {el.children?.map((child, ind) => {
                          return (
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon>{child.icon}</ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography fontWeight={400} fontSize={14}>
                                    {child.title}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </Fragment>
                );
              } else {
                return (
                  <ListItemButton key={index}>
                    <ListItemIcon>{el.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography fontWeight={700} fontSize={14}>
                          {el.title}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              }
            })}
          </List>
        </Box>
        <Box
          sx={{ height: "73px", padding: "15px", borderTop: "1px solid #ddd" }}
        >
          <Typography fontSize={13}>
            © 2023 <strong style={{ color: blue[700] }}>Timesheet</strong>.
          </Typography>
          <Typography fontSize={13}>
            <strong>Version</strong> 4.3.0.0 [20221606]
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
//permanent   persistent temporary
