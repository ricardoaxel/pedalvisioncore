import { Style } from "./InputNumberCustom.css";
import React, { useState, useEffect } from "react";
export const InputNumberCustom = ({
  type,
  name,
  value,
  onChange,
  onClick,
  disabled,
  dir,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(parseFloat(inputValue));
    }, 200);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      css={Style()}
      type={type}
      name={name}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      disabled={disabled}
      dir={dir}
    />
  );
};
