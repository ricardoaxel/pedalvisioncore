import { Style } from "../PBElement.css";
import Draggable from "react-draggable";

export const DraggableDrag = ({
  id,
  left,
  top,
  otherData,
  elementTypeInfo,
  scale,
  showTransitions,
  setShowTransitions,
  rotatePBElement,
  deletePBElement,
  updateElementLayer,
  setActualElement,
  handleEvent,
}) => {
  return (
    <Draggable
      position={{
        x: left,
        y: top,
      }}
      key={id}
      bounds="parent"
      onStop={(e, data) =>
        handleEvent(id, data.lastX, data.lastY, elementTypeInfo)
      }
      onStart={() => setShowTransitions(false)}
      // onDrag={() => setShowTransitions(false)}
      draggable="false"
    >
      <div
        css={Style(
          elementTypeInfo.Width,
          elementTypeInfo.Height,
          scale,
          showTransitions,
          otherData,
          false
        )}
        draggable="false"
        onClick={() => {
          setActualElement({
            id: id,
            particularInfo: otherData,
            elTypeInfo: elementTypeInfo,
          });
          setShowTransitions(true);
        }}
      >
        <img
          className={"elementImage"}
          src={require(`../../../assets/Images/${otherData.type}/${elementTypeInfo.Image}`)}
          //To avoid the default HTML5 drag API
          draggable="false"
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
    </Draggable>
  );
};
