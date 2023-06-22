import {
  List,
  ListSubheader,
  Divider,
  ListItem,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { Fragment } from "react";
import { blue, green, red } from "@mui/material/colors";

import dayjs from "dayjs";
interface ProjectListProps {
  data: any;
}

export default function ProjectList(props: ProjectListProps) {
  const { data } = props;

  return (
    <List
      sx={{ width: "98%", bgcolor: "background.paper", mx: "auto" }}
      component="div"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ backgroundColor: "#ddd", borderRadius: 1, py: 1 }}
        >
          <Typography variant="h6" color="#555">
            {data.customerName}
          </Typography>
        </ListSubheader>
      }
    >
      {data.project.map((el: any, ind: number) => {
        return (
          <Fragment key={ind}>
            <ListItem
              sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Stack
                  direction={"row"}
                  gap={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography fontSize={12}>{el.name}</Typography>
                  <Typography
                    fontSize={12}
                    component="div"
                    sx={{
                      px: 1,
                      backgroundColor: blue[500],
                      borderRadius: 2,
                      py: "1px",
                      color: "white",
                    }}
                  >
                    {el.pms.join(", ")}
                  </Typography>
                  <Typography
                    fontSize={12}
                    component="div"
                    sx={{
                      px: 1,
                      backgroundColor: red[500],
                      borderRadius: 2,
                      py: "1px",
                      color: "white",
                    }}
                  >
                    {el.activeMember} members
                  </Typography>
                  <Typography
                    fontSize={12}
                    component="div"
                    sx={{
                      px: 1,
                      backgroundColor: green[500],
                      borderRadius: 2,
                      py: "1px",
                      color: "white",
                    }}
                  >
                    {el.timeEnd
                      ? dayjs(el.timeStart).format("DD/MM/YYYY") +
                        " - " +
                        dayjs(el.timeEnd).format("DD/MM/YYYY")
                      : dayjs(el.timeStart).format("DD/MM/YYYY")}
                  </Typography>
                </Stack>
                <Button>dsgsd</Button>
              </Box>
            </ListItem>
            <Divider />
          </Fragment>
        );
      })}
    </List>
  );
}
