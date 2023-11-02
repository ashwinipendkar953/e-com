import { useParams } from "react-router-dom";
import Products from "../components/Products";
import Filters from "../components/Filters";
import { Box, Grid } from "@mui/material";
import styled from "@emotion/styled";

const CategoryPage = () => {
  const { catId, catName } = useParams();

  return (
    <StyledContainer className="container-fluid flex-container  px-50">
      <StyledBox className="filters-products-container">
        <Grid item xs={12} md={4} className="filters ">
          <Filters />
        </Grid>

        <Grid item xs={12} md={8} className="products">
          <h2>{catName}</h2>
          <Products catId={catId} />
        </Grid>
      </StyledBox>
    </StyledContainer>
  );
};

export default CategoryPage;

const StyledContainer = styled.div`
  height: 70vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  align-items: stretch;
  height: 100%;
  /* justify-content: start; */

  .filters {
    border-right: 1px solid #ccc;
    padding-right: 10px;
    margin-right: 10px;
    padding-right: 5rem;
  }

  .products {
    flex-grow: 1;
    padding-left: 5rem;
  }
`;
