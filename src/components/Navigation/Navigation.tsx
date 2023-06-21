import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { blue } from "@mui/material/colors";

import { useState } from "react";
import DrawerSideBar from "../DrawerSideBar/DrawerSideBar";

export default function Navigation() {
  // Handle and State Drawer
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const handleToggleDrawer = () => setOpenDrawer((b) => !b);
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: 9999, backgroundColor: blue[500] }}
      >
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
        </Toolbar>
      </AppBar>
      <DrawerSideBar open={openDrawer} setOpen={setOpenDrawer} />
    </Box>
  );
}
