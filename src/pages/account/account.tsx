import { Typography, Box } from "@mui/material";

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";

export default function Account() {
  const [style, setStyle] = useState<
    { transition: string } | { transform: string }
  >({
    transform: "translateY(-20px)",
  });

  useEffect(() => {
    setStyle({
      transition: "transform 0.75s",
    });
  }, []);
  return (
    <div className={styles.container}>
      <Box component="div" sx={style}>
        <Typography variant="h3" color="white" textAlign="center" mt={5}>
          Timesheet
        </Typography>
        <Outlet />
        <Typography
          textAlign="center"
          component="p"
          fontSize="0.75rem"
          mt={4}
          color="white"
        >
          © 2023 Timesheet. Version 4.3.0.0 [20221606]
        </Typography>
      </Box>
    </div>
  );
}
