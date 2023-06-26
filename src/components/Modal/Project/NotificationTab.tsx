import {
  Box,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function NotificationTab() {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <Box mt={2}>
      <Stack>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          }
          label="Gửi thông báo đến Komu"
          sx={{ ".MuiTypography-root": { fontWeight: 600 } }}
        />
        <TextField
          label="Komu chanel id"
          variant="standard"
          disabled={!checked}
        />
      </Stack>
    </Box>
  );
}
