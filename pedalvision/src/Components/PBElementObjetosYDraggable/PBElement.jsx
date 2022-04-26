import { useDrag } from "react-dnd";
import { Style } from "./PBElement.css";
import Draggable from "react-draggable";
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
  children,
  otherData,
  elementTypeInfo,
  scale,
  showTransitions,
  handleEvent,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
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
    // <div
    //   css={Style(
    //     elementTypeInfo.Width,
    //     elementTypeInfo.Height,
    //     scale,
    //     showTransitions,
    //     otherData
    //   )}
    //   style={{ left: left, top }}
    //   ref={drag}
    //   // onMouseOver={() => setShowOptions(true)}
    //   // onMouseOut={() => setShowOptions(false)}
    // >
    //   <img
    //     className={"elementImage"}
    //     src={require(`../../assets/Images/${otherData.type}/${elementTypeInfo.Image}`)}
    //     //To avoid the default HTML5 drag API
    //     draggable="false"
    //     alt=""
    //     // onMouseEnter={() => setShowTransitions(false)}
    //     // onMouseOut={() => {
    //     //   setShowOptions(false);
    //     // }}
    //   />

    //   <div className="borderSquare" draggable="false">
    //     <div
    //       className={`options `}
    //       draggable="false"
    //       // onMouseOver={() => setShowTransitions(true)}
    //     >
    //       {/* <p onClick={() => rotatePBElement("index", index, -90)}>{"<-"}</p>
    //       <p onClick={() => deletePBElement("index", index)}>X</p>
    //       <p onClick={() => rotatePBElement("index", index, 90)}>{"->"}</p> */}
    //     </div>
    //   </div>
    // </div>

    <Draggable
      position={{
        x: left,
        y: top,
      }}
      key={id}
      bounds="parent"
      // onDrag={(e, data) => handleEvent(e, data, el.id, index)}
      onStop={(e, data) => handleEvent(id, data.lastX, data.last)}
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
          left,
          top
        )}
        draggable="false"
        // onMouseOver={() => setShowOptions(true)}
        // onMouseOut={() => setShowOptions(false)}
      >
        <img
          className={"elementImage"}
          src={require(`../../assets/Images/${otherData.type}/${elementTypeInfo.Image}`)}
          //To avoid the default HTML5 drag API
          draggable="false"
          alt=""
          // onMouseEnter={() => setShowTransitions(false)}
          // onMouseOut={() => {
          //   setShowOptions(false);
          // }}
        />

        <div className="borderSquare" draggable="false">
          <div
            className={`options `}
            draggable="false"
            // onMouseOver={() => setShowTransitions(true)}
          >
            {/* <p onClick={() => rotatePBElement("index", index, -90)}>{"<-"}</p>
            <p onClick={() => deletePBElement("index", index)}>X</p>
            <p onClick={() => rotatePBElement("index", index, 90)}>{"->"}</p> */}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
