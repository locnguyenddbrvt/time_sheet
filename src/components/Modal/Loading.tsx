import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ModalLoadingProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  result: boolean | null;
}

export default function ModalLoading(props: ModalLoadingProps) {
  const { open, setOpen, result } = props;
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          height: 280,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {result === null && <CircularProgress color="info" size={"5rem"} />}
        {result === false && (
          <>
            <SmsFailedIcon color="error" sx={{ fontSize: 80 }} />
            <Typography variant="h5" fontWeight={500} mt={2}>
              Login failed!
            </Typography>
            <Typography mt={1} color={"gray"}>
              Invalid user name or password
            </Typography>
            <Button
              color="info"
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => setOpen(false)}
            >
              OK
            </Button>
          </>
        )}
        {result === true && (
          <>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
            <Typography variant="h5" fontWeight={500} mt={2}>
              Login Success!!
            </Typography>
            <Typography mt={1} color={"gray"}>
              Invalid user name or password
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
}
