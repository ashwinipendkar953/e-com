import React from "react";
import { useProductContext } from "../context/ProductContext";
import { Button } from "@mui/material";

const Filters = () => {
  const { checkboxChangeHandler, clearFilters, selectedFilters } =
    useProductContext();

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <div>
          <label>
            <input
              type="checkbox"
              value="delivery"
              checked={selectedFilters.includes("delivery")}
              onChange={() => checkboxChangeHandler("delivery")}
            />
            Delivery
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="expensive"
              checked={selectedFilters.includes("expensive")}
              onChange={() => checkboxChangeHandler("expensive")}
            />
            Expensive
          </label>
        </div>
      </div>

      <div className="mt-30">
        <Button
          onClick={clearFilters}
          color="secondary"
          className="center"
          variant="contained"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Filters;
