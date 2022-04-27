import { useState } from "react";
import { useDrag } from "react-dnd";
import { Style } from "./PBElement.css";
const ItemTypes = {
  BOX: "box",
};

const style = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};
export const PBElement = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  otherData,
  elementTypeInfo,
  scale,
  showTransitions,
  rotatePBElement,
  deletePBElement,
  updateElementLayer,
  setActualElement,
}) => {
  const [hideOptions, setHideOptions] = useState(false);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
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
      style={{ left: left, top, touchAction: "none" }}
      ref={drag}
      onMouseLeave={() => setHideOptions(false)}
      onDragStart={() => setHideOptions(true)}
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
        src={require(`../../assets/Images/${otherData.type}/${elementTypeInfo.Image}`)}
        alt=""
      />

      <div className="borderSquare" draggable="false">
        <div className={`options `}>
          <p onClick={() => rotatePBElement(id, -90)}>{"<-"}</p>
          <p onClick={() => deletePBElement(id)}>X</p>
          <p onClick={() => rotatePBElement(id, 90)}>{"->"}</p>
        </div>
      </div>
      <div className={`layer `} draggable="false">
        <p onClick={() => updateElementLayer(id, 1)}>{"A"}</p>
        <p>{otherData.layer}</p>
        <p onClick={() => updateElementLayer(id, -1)}>{"V"}</p>
      </div>
    </div>
  );
};
