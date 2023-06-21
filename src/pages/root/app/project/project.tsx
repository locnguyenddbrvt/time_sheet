import { Box, Button, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

import AddIcon from "@mui/icons-material/Add";

export default function Projects() {
  return (
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
      <Box
        sx={{
          padding: "15px",
          borderBottom: "1px solid #ddd",
          width: "100%",
        }}
      >
        <Typography>Manage Projects</Typography>
      </Box>
      <Box sx={{ height: "1000px", width: "100%", padding: "20px" }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Button variant="contained" sx={{ backgroundColor: blue[500] }}>
              <AddIcon /> New project
            </Button>
          </Box>
          <Box>sdgd</Box>
          <Box>sdgd</Box>
        </Stack>
      </Box>
    </Box>
  );
}
