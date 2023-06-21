import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { blue, pink } from "@mui/material/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

import ModalLoading from "../../../../components/Modal/Loading";

type Inputs = {
  userName: string;
  password: string;
  remember: boolean;
};

export default function Login() {
  // Handle Toggle ModalLoading
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  // Handle hide password
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(false);
  const handleMouseDownPassword = () => setShowPassword(true);
  // Handle Login
  const [resultLogin, setResultLogin] = useState<null | boolean>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setOpenLoading(true);
    setResultLogin(null);
    axios
      .post(process.env.REACT_APP_API_DOMAIN + `api/TokenAuth/Authenticate`, {
        userNameOrEmailAddress: data.userName,
        password: data.password,
        rememberClient: data.remember,
      })
      .then((response) => {
        Cookies.set("tokenAccess", response.data.result.accessToken, {
          expires: response.data.result.expireInSeconds,
        });
        Cookies.set(
          "encryptedAccessToken",
          response.data.result.encryptedAccessToken,
          {
            expires: response.data.result.expireInSeconds,
          }
        );
        setResultLogin(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setResultLogin(false);
      });
  };

  // UI render
  return (
    <>
      <ModalLoading
        open={openLoading}
        setOpen={setOpenLoading}
        result={resultLogin}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component={"div"}
          sx={{
            backgroundColor: "white",
            mt: 3,
            display: "flex",
            flexDirection: "column",
            width: 360,
            pt: 3,
            px: 2,
            pb: 5,
            boxShadow: 5,
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600} color="#555">
            Log in
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              mt: 2,
            }}
          >
            <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              {...register("userName", {
                required: true,
              })}
              label="User name or email *"
              variant="standard"
              error={!!errors.userName}
              // helperText={errors.userName?.message}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              mt: 2,
            }}
          >
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              fullWidth
              {...register("password", { required: true })}
              type="password"
              label="Password *"
              variant="standard"
              error={!!errors.password}
              // helperText={errors.password?.message}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              mt: 5,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  {...register("remember")}
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <Button
              variant="contained"
              sx={{
                boxShadow: "none",
                mr: 2,
                backgroundColor: pink[600],
                "&:hover": { backgroundColor: pink[400] },
                textTransform: "none",
              }}
              type="submit"
              disabled={!isValid}
            >
              Log in
            </Button>
          </Box>
          <Button
            color="primary"
            variant="contained"
            sx={{ backgroundColor: blue[800], mt: 2 }}
            type="button"
            fullWidth
          >
            Log In with Google
          </Button>
          <FormControl sx={{ mt: 2, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Security Code
            </InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  <HelpOutlineIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
      </form>
    </>
  );
}
