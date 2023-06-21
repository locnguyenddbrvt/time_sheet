import { Outlet } from "react-router-dom";
import Navigation from "../../../components/Navigation/Navigation";
import { Box } from "@mui/material";

export default function AppLayout() {
  return (
    <>
      <Navigation />
      <main
        style={{
          height: "100vh",
          width: "100vw",
          paddingTop: "64px",
          paddingLeft: "300px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            pt: 2,
            px: 2,
            backgroundColor: "#ddd",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Box>
      </main>
    </>
  );
}
