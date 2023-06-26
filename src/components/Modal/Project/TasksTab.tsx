import {
  Box,
  List,
  ListSubheader,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React, { useState, Suspense, lazy, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Loading } from "./UI/ChildChecked";

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
export default function TasksTab(props: TasksTabProps) {
  const { dataTask } = props;
  const arrClone = new Array(dataTask?.length);
  arrClone.fill(true);
  const [checkList, setCheckList] = useState<boolean[]>(
    dataTask ? arrClone : [true]
  );
  const [ChildCheckedComponent, setChildCheckedComponent] =
    useState<null | React.ComponentType<childProps> | null>(null);
  const { control } = useFormContext();

  const handleChangeCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    onChange: (event: any) => void
  ) => {
    setCheckList((b) => {
      const bUpdate = [...b];
      bUpdate[index] = e.target.checked;
      const taskSelect = bUpdate.map((el, ind) => {
        return {
          taskId: dataTask && dataTask[ind].id,
          billable: el,
        };
      });
      onChange(taskSelect);
      return bUpdate;
    });
  };
  const handleChangeAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (checkList.some((e) => e === true) &&
        checkList.some((e) => e === false)) ||
      checkList.every((e) => e === false)
    ) {
      setCheckList((b: boolean[]) => {
        const bUpdate = [...b];
        bUpdate.fill(true);
        return bUpdate;
      });
    } else {
      setCheckList((b: boolean[]) => {
        const bUpdate = [...b];
        bUpdate.fill(false);
        return bUpdate;
      });
    }
  };
  useEffect(() => {
    const loadComponent = async () => {
      const ChildCheckedComponent = await lazy(
        () => import("./UI/ChildChecked")
      );
      setChildCheckedComponent(ChildCheckedComponent);
    };
    loadComponent();
  }, []);
  return (
    <Box sx={{}}>
      <List
        subheader={
          <ListSubheader sx={{ backgroundColor: "#f9f9f9", py: 1 }}>
            <Stack direction={"row"} alignItems={"center"} width={"100%"}>
              <Box width={"50%"}>
                <Typography variant="h6" color="#555">
                  Tasks
                </Typography>
              </Box>
              <Box width={"50%"} display="flex" justifyContent="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkList.every((e) => e === true)}
                      onChange={handleChangeAllChecked}
                      indeterminate={
                        checkList.some((e) => e === true) &&
                        !checkList.every((e) => e === true)
                      }
                    />
                  }
                  labelPlacement="top"
                  label="Billable"
                />
              </Box>
            </Stack>
          </ListSubheader>
        }
      >
        <Controller
          name="tasks"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <Suspense fallback={<Loading quantity={20} />}>
              {dataTask &&
                ChildCheckedComponent &&
                dataTask.map((el, index) => {
                  return (
                    <ChildCheckedComponent
                      key={index}
                      el={el}
                      index={index}
                      handleChangeCheck={(
                        e: React.ChangeEvent<HTMLInputElement>,
                        ind: number
                      ) => handleChangeCheck(e, ind, onChange)}
                      checkList={checkList}
                    />
                  );
                })}
            </Suspense>
          )}
        />
      </List>
    </Box>
  );
}
