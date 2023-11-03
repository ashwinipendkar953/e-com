import { Box, Card, Grid } from "@mui/material";
import React from "react";
import { useProductContext } from "../context/ProductContext";
import styled from "@emotion/styled";

const Checkout = () => {
  const { cartItems } = useProductContext();
  return (
    <div className="container ">
      <h2>Checkout</h2>
      <div className="flex-container ">
        <Card style={{ height: "100%" }}>
          <StyledBox className="py-50 px-50">
            <Grid container spacing={2} className="header">
              <Grid item xs={5} className="text-center">
                <div>Name</div>
              </Grid>
              <Grid item xs={3} className="text-left">
                <div>Price</div>
              </Grid>
              <Grid item xs={4} className="text-left">
                <div>Quantity</div>
              </Grid>
            </Grid>

            {cartItems.map((item, index) => {
              const { id, name, thumbnail, price, inStock } = item;
              return (
                <CustomGrid key={index} container spacing={2}>
                  <Grid xs={2}>
                    <img src={thumbnail} alt={name} className="item-img" />
                  </Grid>
                  <Grid xs={3}>
                    <div>{name}</div>
                  </Grid>
                  <Grid xs={3}>
                    <div>${price}</div>
                  </Grid>
                  <Grid xs={2}>
                    <div className="item-quantity">5</div>
                  </Grid>
                  <Grid xs={2}>
                    <button className="button">X</button>
                  </Grid>
                </CustomGrid>
              );
            })}
          </StyledBox>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;

const StyledBox = styled(Box)`
  .header {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
  }
`;

const CustomGrid = styled(Grid)`
  padding-top: 50px;
  padding-left: 30px;

  .item-img {
    width: 50px;
    height: 50px;
  }

  .item-quantity {
    border-bottom: 1px solid #ccc;
    width: 25px;
    text-align: center;
  }

  .button {
    border-radius: 50%;
    background-color: black;
    color: white;
    padding: 4px 7px;
  }
`;
