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

const Products = ({ catId }) => {
  const { getDisplayProducts, addToCartHandler } = useProductContext();
  const displayProducts = getDisplayProducts(catId);

  return (
    <div className="container flex-container mt-30">
      <Box>
        <Grid container spacing={2}>
          {displayProducts.length === 0 && <div>No products found</div>}{" "}
          {displayProducts.map((product) => {
            if (!product) return <div>No products found</div>;
            const { id, name, thumbnail, price, inStock } = product;
            return (
              <Grid item md={4} key={id}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={name}
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

                    <Button
                      variant="contained"
                      color="secondary"
                      className="center pt-10"
                      disabled={!inStock}
                      onClick={() => inStock && addToCartHandler(product)}
                    >
                      Add to cart
                    </Button>
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
