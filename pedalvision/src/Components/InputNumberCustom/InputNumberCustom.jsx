import { Style } from "./InputNumberCustom.css";
import React, { useState, useEffect } from "react";
export const InputNumberCustom = ({
  name,
  value,
  onChange,
  onClick,
  disabled,
  dir,
}) => {
  return (
    <input
      type={"number"}
      css={Style()}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      dir={dir}
    />
  );
};
