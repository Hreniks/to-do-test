import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import TaskList from "./TaskList";

const TabsComponent: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="All Tasks" />
        <Tab label="Incomplete Tasks" />
        <Tab label="Completed Tasks" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TaskList filter="all" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TaskList filter="incomplete" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TaskList filter="completed" />
      </TabPanel>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabsComponent;
