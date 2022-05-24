import { useState } from "react";
import { useDrag } from "react-dnd";
import { Style } from "../PBElement.css";
import { FiRotateCcw, FiRotateCw } from "react-icons/fi";
import {
  AiOutlineClose,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/ai";
import ReactTooltip from "react-tooltip";
export const HTMLDrag = ({
  id,
  left,
  top,
  elementTypeInfo,
  hideSourceOnDrag,
  scale,
  showTransitions,
  otherData,
  setActualElement,
  rotatePBElement,
  deletePBElement,
  updateElementLayer,
}) => {
  const [hideOptions, setHideOptions] = useState(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { id, left, top, elementTypeInfo },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  return (
    <div
      css={Style(
        elementTypeInfo.Width,
        elementTypeInfo.Height,
        scale,
        showTransitions,
        otherData,
        hideOptions
      )}
      style={{ left: left, top: top, touchAction: "none" }}
      ref={drag}
      onMouseLeave={() => setHideOptions(false)}
      onDragStart={() => setHideOptions(true)}
      // onDragLeave={() => setHideOptions(false)}
      // onDragEnd={() => setHideOptions(false)}
      onClick={() =>
        setActualElement({
          id: id,
          particularInfo: otherData,
          elTypeInfo: elementTypeInfo,
        })
      }
    >
      <img
        className={"elementImage"}
        src={require(`../../../assets/Images/${otherData.type}/${elementTypeInfo.Image}`)}
        alt=""
      />

      <div className="borderSquare" draggable="false">
        <div className={`options `}>
          <p onClick={() => rotatePBElement(id, -90)}>
            <FiRotateCcw size={9} data-tip="Rotate left" />
          </p>
          <p onClick={() => deletePBElement(id)}>
            <AiOutlineClose size={12} data-tip="Delete" />
          </p>
          <p onClick={() => rotatePBElement(id, 90)}>
            {" "}
            <FiRotateCw size={9} data-tip="Rotate right" />
          </p>
          <ReactTooltip place="bottom" type="dark" effect="float" />
        </div>
      </div>
      <div className={`layer `} draggable="false">
        <p onClick={() => updateElementLayer(id, 1)}>
          <AiOutlineArrowUp data-tip="Move up" />
          <ReactTooltip place="bottom" type="dark" effect="float" />
        </p>
        <p data-tip="Actual layer">{otherData.layer}</p>
        <p onClick={() => updateElementLayer(id, -1)}>
          <AiOutlineArrowDown data-tip="Move down" />
        </p>
      </div>
    </div>
  );
};
