import { Style } from "./SelectCustom.css";
export const SelectCustom = ({ children, className, onChange }) => {
  return (
    <select css={Style()} onChange={onChange}>
      {children}
    </select>
  );
};
