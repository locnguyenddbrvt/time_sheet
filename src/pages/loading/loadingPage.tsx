import { Box, Stack, Typography } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";

export default function LoadingPage() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          width: 700,
          height: 400,
          position: "absolute",
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%,-0%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          //   border: "1px solid #ddd",
        }}
      >
        <Stack alignItems="center" gap={2}>
          <Typography variant="h3" fontWeight={600} color="#0dcaf0">
            Timesheets
          </Typography>
          <Stack direction="row" gap={2}>
            <Spinner
              animation="grow"
              variant="info"
              style={{ height: 20, width: 20 }}
            />
            <Spinner
              animation="grow"
              variant="info"
              style={{ height: 20, width: 20 }}
            />
            <Spinner
              animation="grow"
              variant="info"
              style={{ height: 20, width: 20 }}
            />
            <Spinner
              animation="grow"
              variant="info"
              style={{ height: 20, width: 20 }}
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
