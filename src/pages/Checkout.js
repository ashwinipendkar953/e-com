import { Box, Button, Card, Grid } from "@mui/material";
import React from "react";
import { useProductContext } from "../context/ProductContext";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Checkout = () => {
  const { cartItems, removeCartItem, incrementHandler, decrementHandler } =
    useProductContext();

  return (
    <div className="container ">
      <h2>Checkout</h2>
      <div className="flex-container ">
        <Card style={{ height: "100%" }}>
          <StyledBox className="py-50 px-50">
            <Grid container spacing={2} xs={12} className="header">
              <Grid item xs={5} className="text-center">
                <div>Name</div>
              </Grid>
              <Grid item xs={3}>
                <div>Price</div>
              </Grid>
              <Grid item xs={4} className="text-left">
                <div>Quantity</div>
              </Grid>
            </Grid>

            {cartItems.map((item, index) => {
              const { id, name, thumbnail, price, quantity } = item;
              return (
                <CustomGrid key={index} container spacing={2}>
                  <Grid xs={2}>
                    <img src={thumbnail} alt={name} className="item-img" />
                  </Grid>
                  <Grid xs={3}>
                    <div>{name}</div>
                  </Grid>
                  <Grid xs={3}>
                    <div>${quantity * price}</div>
                  </Grid>
                  <Grid xs={2}>
                    <div className="item-quantity">
                      <span
                        className="qtyBtn"
                        onClick={() => incrementHandler(item)}
                      >
                        +
                      </span>
                      <span className="quantity">{quantity}</span>
                      <span
                        className="qtyBtn"
                        onClick={() => decrementHandler(item)}
                      >
                        -
                      </span>
                    </div>
                  </Grid>
                  <Grid xs={2}>
                    <button
                      className="button"
                      onClick={() => removeCartItem(id)}
                    >
                      X
                    </button>
                  </Grid>
                </CustomGrid>
              );
            })}
          </StyledBox>
        </Card>
      </div>

      <Link to="/">
        <Button>
          <ArrowBackIcon className="mr" />
          continue shopping
        </Button>
      </Link>
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

  .qtyBtn {
    border: 1px solid #ccc;
    padding: 2px 8px;
  }

  .qtyBtn:hover {
    background-color: aliceblue;
    font-weight: bold;
  }

  .quantity {
    padding: 0 10px;
    font-weight: bold;
  }

  .button {
    border-radius: 50%;
    background-color: black;
    color: white;
    padding: 4px 7px;
  }
`;
