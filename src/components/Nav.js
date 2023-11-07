import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useProductContext } from "../context/ProductContext";

const Nav = () => {
  const { cartItems, price } = useProductContext();

  return (
    <Navbar>
      <FlexContainer className="container">
        <p className="nav-title">
          <NavLink to="/" className="link">
            E-commerce store
          </NavLink>
        </p>
        <p className="nav-description">
          <NavLink to="/checkout" className="link checkout summary flex-center">
            <Button className="cartItems" color="secondary" variant="contained">
              {cartItems.length}
            </Button>

            <span className="total-price">${price}</span>
          </NavLink>
        </p>
      </FlexContainer>
    </Navbar>
  );
};

export default Nav;

const Navbar = styled.div`
  padding: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .nav-title {
    margin: 0;
    line-height: 1.15;
    font-size: 2rem;
    font-weight: 700;
  }

  .nav-description {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .cartItems {
    border-radius: 50%;
    height: 40px;
    width: 10px !important;
    margin-right: 10px;
    font-size: 20px;
  }
`;
