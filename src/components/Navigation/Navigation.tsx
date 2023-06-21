import {
  Box,
  FormGroup,
  Switch,
  FormControlLabel,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useState } from "react";
import DrawerSideBar from "../DrawerSideBar/DrawerSideBar";

export default function Navigation() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {};
  const handleChange = () => {};
  const handleMenu = () => {};
  // Handle and State Drawer
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const handleToggleDrawer = () => setOpenDrawer((b) => !b);
  return (
    <Box>
      <AppBar position="fixed" sx={{ zIndex: 9999 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { lg: "none" } }}
            onClick={handleToggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Timesheet
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <DrawerSideBar open={openDrawer} setOpen={setOpenDrawer} />
    </Box>
  );
}
