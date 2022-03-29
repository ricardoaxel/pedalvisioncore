import { Style, pedalStyle } from "./Pedalboard.css";
import { Images } from "../../assets/images";
import React, { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";

const Pedalboard = ({ children, className }) => {
  //This gave us the actual width of the window (this would be equal to the total centimenters of the pedalboard)
  const ref = useRef("");
  let pbAreaWidth = 60;
  let pbAreaHeight = 180;
  let pbAreaResponsiveWidth = ref.current.offsetWidth;
  let pbAreaResponsiveHeight =
    (pbAreaHeight * pbAreaResponsiveWidth) / pbAreaWidth;

  //The position of the elements is saved on percentage because of responsive behavior
  const [position, setPosition] = useState({ x: 0.314, y: 0.07 });
  const handleEvent = (e, data) => {
    setPosition({
      x: data.lastX / pbAreaResponsiveWidth,
      y: data.lastY / pbAreaResponsiveHeight,
    });
  };
  const [position2, setPosition2] = useState({ x: 0.314, y: 0.07 });
  const handleEvent2 = (e, data) => {
    setPosition2({
      x: data.lastX / pbAreaResponsiveWidth,
      y: data.lastY / pbAreaResponsiveHeight,
    });
  };
  useEffect(() => {
    console.log(position);
  }, [position]);

  return (
    <div css={Style(pbAreaResponsiveHeight)} className={className} ref={ref}>
      <div className="pedalboardAreaContainer">
        <Draggable
          position={{
            x: position2.x * pbAreaResponsiveWidth,
            y: position2.y * pbAreaResponsiveHeight,
          }}
          bounds="parent"
          onDrag={(e, data) => handleEvent2(e, data)}
        >
          <img
            css={pedalStyle(pbAreaWidth, 50, pbAreaHeight, 20, true)}
            src={Images.pedalboard}
            alt=""
            draggable="false"
          />
        </Draggable>
        <Draggable
          position={{
            x: position.x * pbAreaResponsiveWidth,
            y: position.y * pbAreaResponsiveHeight,
          }}
          bounds="parent"
          onDrag={(e, data) => handleEvent(e, data)}
        >
          <img
            css={pedalStyle(pbAreaWidth, 7.9, pbAreaHeight, 8.9)}
            src={Images.rat}
            //To avoid the default HTML5 drag API
            draggable="false"
            alt=""
          />
        </Draggable>
      </div>
    </div>
  );
};

export { Pedalboard };
