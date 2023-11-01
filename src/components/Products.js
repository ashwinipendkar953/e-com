import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Products = ({ catId }) => {
  const { getDisplayProducts } = useProductContext();
  const displayProducts = getDisplayProducts(catId);

  return (
    <div className="container flex-container mt-30">
      <Box>
        <Grid container spacing={2}>
          {displayProducts.map((product) => {
            const {
              id,
              name,
              thumbnail,
              price,
              currency,
              inStock,
              categoryId,
            } = product;
            console.log(catId, categoryId);
            return (
              <Grid item xs={12} md={4} key={id}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={name}
                    // sx={{ height: 200, margin: "auto" }}
                    sx={
                      catId === "fgsa2142fa"
                        ? { height: 200, margin: "auto" }
                        : { width: 151, height: 200, margin: "auto" }
                    }
                    image={thumbnail}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      color="text.secondary"
                    >
                      {name}
                    </Typography>
                    <Typography variant="h6">$ {price}</Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      gutterBottom
                      style={{ color: inStock ? "green" : "red" }}
                    >
                      {inStock ? <div>In stock</div> : <div>Out of stock</div>}
                    </Typography>
                    <Link to="/cart">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="center pt-10"
                      >
                        Add to cart
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default Products;