import { CheckBox } from "@mui/icons-material";
import { FormControl, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const Filters = () => {
  const handleCheckbox = () => {};
  return (
    <div>
      <h2>Filters</h2>

      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <CheckBox
                checked
                onChange={handleCheckbox}
                name="delivery"
                className="mr"
              />
            }
            label="Delivery"
          />

          <FormControlLabel
            control={
              <CheckBox
                checked
                onChange={handleCheckbox}
                name="expensive"
                className="mr"
              />
            }
            label="Expensive"
          />
          <FormControlLabel
            control={
              <CheckBox
                checked
                onChange={handleCheckbox}
                name="bestSelling"
                className="mr"
              />
            }
            label="Best-selling"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default Filters;
