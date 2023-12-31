import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useCategoryContext } from "../context/CategoryContext";

// console.log(categories);

const Home = () => {
  const { categories } = useCategoryContext();
  return (
    <div className="container flex-container mt-50">
      <Box>
        <Grid container spacing={2} columns={12}>
          {categories.map((data) => (
            <Grid item xs={12} md={6} key={data.id}>
              <Card className="custom-card ">
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {data.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.description}
                  </Typography>
                </CardContent>
                <CardActions className="mt-50">
                  <Link to={`/category-page/${data.name}/${data.id}`}>
                    <Button size="small">View Products</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
