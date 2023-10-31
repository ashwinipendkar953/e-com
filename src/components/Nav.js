import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Nav = () => {
  return (
    <Navbar>
      <FlexContainer className="container">
        <p className="nav-title">
          <NavLink to="/" className="link">
            E-commerce store
          </NavLink>
        </p>
        <p className="nav-description">
          <NavLink to="/cart" className="link checkout summary">
            <ShoppingCartIcon className="mr" />
          </NavLink>
          <span className="total-price">$2.00</span>
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
`;
