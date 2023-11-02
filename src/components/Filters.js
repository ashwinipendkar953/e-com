import React, { useState } from "react";
import { useProductContext } from "../context/ProductContext";
import { Button } from "@mui/material";

const Filters = () => {
  const { checkboxChangeHandler, clearFilters } = useProductContext();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    checkboxChangeHandler(!isChecked);
  };

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <div>
          <label>
            <input
              type="checkbox"
              value="delivery"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Delivery
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
