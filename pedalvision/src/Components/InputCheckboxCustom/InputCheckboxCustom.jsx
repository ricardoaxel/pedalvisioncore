import { Style } from "./InputCheckboxCustom.css";
import React, { useState, useEffect } from "react";
export const InputCheckboxCustom = ({ onChange, checked }) => {
  return (
    <input
      css={Style()}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      name="checkbox"
    />
  );
};
