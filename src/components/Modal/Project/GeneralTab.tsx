import {
  Box,
  Select,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { blue, red } from "@mui/material/colors";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";

import { clientListContext } from "../../../pages/root/app/project/project";

export default function GeneralTab() {
  const [projectType, setProjectType] = useState<
    | null
    | "Time & Materials"
    | "Fixed Fee"
    | "Non-Billable"
    | "ODC"
    | "Product"
    | "Tranning"
  >(null);
  const projectTypes = [
    "Time & Materials",
    "Fixed Fee",
    "Non-Billable",
    "ODC",
    "Product",
    "Tranning",
  ];
  const clientList = useContext(clientListContext);
  const [client, setClient] = useState<string>("Client 1");
  return (
    <Box sx={{ p: 2, height: "670px" }}>
      <form>
        <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
          <Typography fontWeight={600} fontSize={14}>
            Client*
          </Typography>
          <Box>
            <FormControl sx={{ width: "60%" }}>
              <InputLabel id="demo-simple-select-label">
                Choose a client...
              </InputLabel>
              <Select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                label="Choose a client..."
              >
                {clientList &&
                  clientList.map((client) => {
                    return (
                      <MenuItem key={client.id} value={client.name}>
                        {client.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ backgroundColor: blue[500], ml: 5 }}
            >
              <AddIcon />
              New Client
            </Button>
          </Box>
        </Box>
        <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
          <Typography fontWeight={600} fontSize={14}>
            Project Name*
          </Typography>
          <TextField
            placeholder="Project Name"
            helperText="Project Name is required!!"
            sx={{ width: "60%" }}
          />
        </Box>
        <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
          <Typography fontWeight={600} fontSize={14}>
            Project Code*
          </Typography>
          <TextField
            placeholder="Project Code"
            helperText="Project Code is required!!"
            sx={{ width: "60%" }}
          />
        </Box>
        <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
          <Typography fontWeight={600} fontSize={14}>
            Date*
          </Typography>
          <Box display={"flex"} sx={{ alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ width: "20%" }} />
            </LocalizationProvider>
            <Typography sx={{ mx: 2 }}>to</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{ width: "20%" }} />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
          <Typography fontWeight={600} fontSize={14}>
            Note
          </Typography>
          <TextField sx={{ width: "100%" }} />
        </Box>
        <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
          <Typography fontWeight={600} fontSize={14}>
            All User
          </Typography>
          <FormControlLabel
            control={<Checkbox color="error" />}
            label="Auto add user as a member of this project when creating new user"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
          <Typography fontWeight={600} fontSize={14}>
            All User
          </Typography>
          <Box>
            <Grid container spacing={2}>
              {projectTypes.map((type, ind) => {
                return (
                  <Grid key={type} item md={3}>
                    <Box
                      onClick={() =>
                        setProjectType(
                          type as
                            | "Time & Materials"
                            | "Fixed Fee"
                            | "Non-Billable"
                            | "ODC"
                            | "Product"
                            | "Tranning"
                        )
                      }
                      sx={
                        projectType === type
                          ? {
                              backgroundColor: red[500],
                              py: 1,
                              fontWeight: 600,
                              borderRadius: 2,
                              border: "1px solid #ddd",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "white",
                            }
                          : {
                              "&:hover": {
                                backgroundColor: red[300],
                                color: "white",
                                borderColor: red[300],
                                cursor: "pointer",
                              },
                              border: "1px solid #ddd",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 2,
                              py: 1,
                              fontWeight: 600,
                            }
                      }
                    >
                      {type}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
