import {
  Typography,
  ListItemIcon,
  Skeleton,
  List,
  Avatar,
  ListItemText,
  ListItem,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

interface UserRender {
  name: string;
  emailAddress: string;
  isActive: true;
  type: 0 | 1 | 2 | null;
  jobTitle: null;
  level: number;
  userCode: string;
  avatarPath: string;
  avatarFullPath: string;
  branch: null;
  branchColor: string;
  branchDisplayName: string;
  branchId: number;
  id: number;
  isSelected: boolean;
  projectType: 0 | 1 | 2 | 3 | null;
}
interface Props {
  userRender: UserRender[] | null;
  setUserRender: React.Dispatch<React.SetStateAction<UserRender[] | null>>;
  handleUnSelectUser: (user: UserRender) => void;
}
export default function LeftUI(props: Props) {
  const { userRender, handleUnSelectUser, setUserRender } = props;
  return (
    <List>
      {userRender &&
        userRender
          .filter((user) => user.isSelected)
          .map((user, index) => {
            return (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                }}
              >
                <ListItemIcon>
                  <IconButton onClick={() => handleUnSelectUser(user)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemIcon>
                <Avatar alt="" src={user.avatarFullPath} />
                <ListItemText
                  sx={{ ml: 2 }}
                  primary={user.name}
                  secondary={user.emailAddress}
                />
                {user.type === 0 && (
                  <Typography
                    fontSize={12}
                    fontWeight={600}
                    color={"white"}
                    component={"div"}
                    sx={{
                      backgroundColor: red[500],
                      px: 1,
                      borderRadius: 4,
                    }}
                  >
                    Staff
                  </Typography>
                )}
                {user.type === 1 && (
                  <Typography
                    fontSize={12}
                    fontWeight={600}
                    color={"white"}
                    component={"div"}
                    sx={{
                      backgroundColor: green[500],
                      px: 1,
                      borderRadius: 4,
                    }}
                  >
                    Internship
                  </Typography>
                )}
                {user.type === 2 && (
                  <Typography
                    fontSize={12}
                    fontWeight={600}
                    color={"white"}
                    component={"div"}
                    sx={{
                      backgroundColor: blue[500],
                      px: 1,
                      borderRadius: 4,
                    }}
                  >
                    Collaborator
                  </Typography>
                )}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={user.projectType}
                    onChange={(e) =>
                      setUserRender((b) => {
                        if (b) {
                          const bUpdate = [...b];
                          const index = bUpdate.findIndex(
                            (userr) => userr.id === user.id
                          );
                          bUpdate[index].projectType = e.target.value as
                            | 0
                            | 1
                            | 2
                            | 3;
                          return bUpdate;
                        } else return b;
                      })
                    }
                  >
                    <MenuItem value={0}>Member</MenuItem>
                    <MenuItem value={1}>Project Manager</MenuItem>
                    <MenuItem value={2}>Shadow</MenuItem>
                    <MenuItem value={3}>Deactive</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            );
          })}
    </List>
  );
}
export function LoadingLeft() {
  return (
    <List id="testt">
      {Array.from({ length: 10 }, (_, index: number) => {
        return (
          <ListItem
            key={index}
            sx={{
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <Skeleton variant="circular" width={40} height={40} />
            <ListItemText
              sx={{ ml: 2 }}
              primary={
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "150px" }}
                />
              }
              secondary={
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "14px", width: "250px" }}
                />
              }
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", width: "50px" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.75rem", width: "100px", ml: 2 }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
