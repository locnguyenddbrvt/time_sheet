import {
  Box,
  List,
  ListSubheader,
  Typography,
  ListItem,
  Stack,
  Checkbox,
} from "@mui/material";

interface TasksTabProps {
  dataTask:
    | null
    | {
        name: string;
        type: number;
        isDeleted: boolean;
        id: number;
      }[];
}
export default function TasksTab(props: TasksTabProps) {
  const { dataTask } = props;
  return (
    <Box sx={{}}>
      <List
        subheader={
          <ListSubheader sx={{ backgroundColor: "#f9f9f9", py: 1 }}>
            <Typography variant="h6" color="#555">
              Tasks
            </Typography>
          </ListSubheader>
        }
      >
        {dataTask &&
          dataTask.map((el, index) => {
            return (
              <ListItem key={index}>
                <Stack direction={"row"} alignItems={"center"} width={"100%"}>
                  <Box width={"50%"}>
                    <Typography>adgad</Typography>
                  </Box>
                  <Box width={"50%"}>
                    <Checkbox defaultChecked />
                  </Box>
                </Stack>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
}
