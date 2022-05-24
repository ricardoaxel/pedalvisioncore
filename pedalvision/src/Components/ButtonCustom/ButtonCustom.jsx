import { Style } from "./ButtonCustom.css";
export const ButtonCustom = ({
  style,
  children,
  className,
  onClick,
  type,
  dataTip,
}) => {
  return (
    <button
      style={style}
      css={Style(type)}
      type="button"
      className={className}
      onClick={onClick}
      data-tip={dataTip}
    >
      {children}
    </button>
  );
};
