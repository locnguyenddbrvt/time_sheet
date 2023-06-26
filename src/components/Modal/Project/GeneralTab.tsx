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
import { useFormContext, Controller } from "react-hook-form";

import { clientListContext } from "../../../pages/root/app/project/project";
import dayjs from "dayjs";

export default function GeneralTab() {
  const [projectType, setProjectType] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const projectTypes = [
    "Time & Materials",
    "Fixed Fee",
    "Non-Billable",
    "ODC",
    "Product",
    "Tranning",
  ];
  const clientList = useContext(clientListContext);
  const {
    register,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();

  return (
    <Box sx={{ p: 2, height: "670px" }}>
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
              label="Choose a client..."
              defaultValue={1}
              {...register("customerId")}
              error={!!errors.customerId}
              onChange={() => {
                // console.log(isDirty, getFieldState);
              }}
            >
              {clientList &&
                clientList.map((client) => {
                  return (
                    <MenuItem key={client.id} value={client.id}>
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
          // helperText={Boolean(errors.name) ? errors.name.message : ""}
          sx={{ width: "60%" }}
          {...register("name", { required: true })}
          error={Boolean(errors.name)}
          onChange={(e) => {
            console.log(errors);

            if (e.target.value.trim().length === 0) {
              setError("name", {
                type: "manual",
                message: "Project Name is required!!",
              });
            } else {
              clearErrors("name");
            }
          }}
        />
      </Box>
      <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
        <Typography fontWeight={600} fontSize={14}>
          Project Code*
        </Typography>
        <TextField
          placeholder="Project Code"
          // helperText="Project Code is required!!"
          sx={{ width: "60%" }}
          {...register("code", { required: true })}
          error={Boolean(errors.code)}
          onChange={(e) => {
            if (e.target.value.trim().length === 0) {
              setError("code", {
                type: "manual",
                message: "Project Code is required!!",
              });
            } else {
              clearErrors("code");
            }
          }}
        />
      </Box>
      <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
        <Typography fontWeight={600} fontSize={14}>
          Date*
        </Typography>
        <Box
          display={"flex"}
          sx={
            errors.timeStart || errors.timeEnd
              ? {
                  alignItems: "center",
                  ".MuiOutlinedInput-root": { border: "1px solid red" },
                }
              : { alignItems: "center" }
          }
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="timeStart"
              control={control}
              render={({ field: { onChange, ref }, formState, fieldState }) => (
                <DatePicker
                  sx={{
                    width: "20%",
                  }}
                  ref={ref}
                  onChange={(value: Date | null) => {
                    onChange(dayjs(value).format());
                  }}
                  onError={() => {
                    console.log("errrre time start");
                  }}
                  // Mui-error
                />
              )}
            />
          </LocalizationProvider>
          <Typography sx={{ mx: 2 }}>to</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="timeEnd"
              control={control}
              render={({ field: { onChange, ref }, formState, fieldState }) => (
                <DatePicker
                  sx={{ width: "20%" }}
                  ref={ref}
                  onChange={(value: Date | null) => {
                    onChange(dayjs(value).format());
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Box display={"grid"} sx={{ gridTemplateColumns: "1fr 5fr", mb: 3 }}>
        <Typography fontWeight={600} fontSize={14}>
          Note
        </Typography>
        <TextField sx={{ width: "100%" }} {...register("note")} />
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
          Project Types*
        </Typography>
        <Box>
          <Controller
            name="projectType"
            control={control}
            render={({ field: { onChange, ref } }) => (
              <Grid container ref={ref} spacing={2}>
                {projectTypes.map((type, ind) => {
                  return (
                    <Grid key={type} item md={3}>
                      <Box
                        onClick={() => {
                          onChange(ind);
                          setProjectType(ind as 0 | 1 | 2 | 3 | 4 | 5);
                        }}
                        sx={
                          projectType === ind
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
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}
