import {
  Typography,
  ListItemIcon,
  ListItemButton,
  List,
  ListItemText,
  Avatar,
  ListItem,
  Skeleton,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

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
  handleSelectUser: (user: UserRender) => void;
}
export default function RightUI(props: Props) {
  const { userRender, handleSelectUser } = props;

  return (
    <List id="testt">
      {userRender &&
        userRender
          .filter((user: UserRender) => !user.isSelected)
          .map((user: UserRender, index: number) => {
            return (
              <ListItemButton
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                }}
                onClick={() => handleSelectUser(user)}
              >
                <ListItemIcon>
                  <ArrowBackIosNewIcon />
                </ListItemIcon>
                <Avatar alt={user.name} src={user.avatarFullPath} />
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
              </ListItemButton>
            );
          })}
    </List>
  );
}

export function LoadingRight() {
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
              <ArrowBackIosNewIcon />
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
          </ListItem>
        );
      })}
    </List>
  );
}
