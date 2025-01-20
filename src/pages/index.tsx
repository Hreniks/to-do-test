import React from "react";
import { Container, Typography, Box } from "@mui/material";
import TabsComponent from "../components/TabsComponent";
import AddTask from "../components/AddTask";

const Home: React.FC = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Todo List
        </Typography>
        <AddTask />
        <TabsComponent />
      </Box>
    </Container>
  );
};

export default Home;
