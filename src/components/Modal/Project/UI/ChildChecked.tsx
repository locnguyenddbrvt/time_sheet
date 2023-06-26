import {
  Box,
  Typography,
  ListItem,
  Stack,
  Checkbox,
  Skeleton,
} from "@mui/material";
interface childProps {
  index: number;
  el: {
    name: string;
    type: number;
    isDeleted: boolean;
    id: number;
  };
  handleChangeCheck: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  checkList: boolean[];
}
export default function ChildChecked(props: childProps) {
  const { index, el, handleChangeCheck, checkList } = props;

  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} width={"100%"}>
        <Box width={"50%"}>
          <Typography>{el.name}</Typography>
        </Box>
        <Box width={"50%"} display="flex" justifyContent="center">
          <Checkbox
            checked={checkList[index]}
            onChange={(e) => handleChangeCheck(e, index)}
          />
        </Box>
      </Stack>
    </ListItem>
  );
}
interface LoadingProps {
  quantity: number;
}
export function Loading(props: LoadingProps) {
  const { quantity } = props;

  return (
    <>
      {Array.from({ length: quantity }, (_, ind: number) => {
        return (
          <ListItem key={ind}>
            <Stack direction={"row"} alignItems={"center"} width={"100%"}>
              <Box width={"50%"}>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.75rem", width: "200px", ml: 2 }}
                />
              </Box>
              <Box width={"50%"} display="flex" justifyContent="center">
                <Checkbox defaultChecked />
              </Box>
            </Stack>
          </ListItem>
        );
      })}
    </>
  );
}
