import { Style } from "./ButtonCustom.css";
export const ButtonCustom = ({ style, children, className, onClick, type }) => {
  return (
    <button
      style={style}
      css={Style(type)}
      type="button"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
