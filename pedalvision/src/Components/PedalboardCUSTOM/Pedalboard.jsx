import { Style } from "./Pedalboard.css";
import React, { useRef, useEffect, useState, useCallback } from "react";
import pedals from "../../utils/pedals.json";
import pedalboards from "../../utils/pedalboards.json";
import { PBElement } from "../PBElementCUSTOM/PBElement";
import { getLatestPositions } from "../../utils/functions/getLatestsPositions";
import update from "immutability-helper";

export const Pedalboard = ({
  pedalboardData,
  setPedalboardData,
  className,
  scale,
  pbAreaSize,
  showTransitions,
  setShowTransitions,
  setPbScrollBarSize,
  setPbAreaSize,
  boxes,
  setBoxes,
}) => {
  const containerRef = useRef();

  const handleEvent = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
  );

  useEffect(() => {
    if (containerRef.current !== undefined) {
      let container = containerRef.current;
      container.addEventListener("pointerdown", userPressed, { passive: true });

      var element, bbox, startX, startY, deltaX, deltaY, raf;

      function userPressed(event) {
        element = event.target;
        if (element.classList.contains("box")) {
          startX = event.clientX;
          startY = event.clientY;
          bbox = element.getBoundingClientRect();
          container.addEventListener("pointermove", userMoved, {
            passive: true,
          });
          container.addEventListener("pointerup", userReleased, {
            passive: true,
          });
          container.addEventListener("pointercancel", userReleased, {
            passive: true,
          });
        }
      }

      function userMoved(event) {
        // if no previous request for animation frame - we allow js to proccess 'move' event:
        if (!raf) {
          deltaX = event.clientX - startX;
          deltaY = event.clientY - startY;
          raf = requestAnimationFrame(userMovedRaf);
        }
      }

      function userMovedRaf() {
        element.style.transform =
          "translate3d(" + deltaX + "px," + deltaY + "px, 0px)";
        // once the paint job is done we 'release' animation frame variable to allow next paint job:
        raf = null;
      }

      function userReleased(event) {
        container.removeEventListener("pointermove", userMoved);
        container.removeEventListener("pointerup", userReleased);
        container.removeEventListener("pointercancel", userReleased);
        // if animation frame was scheduled but the user already stopped interaction - we cancel the scheduled frame:
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
        element.style.left = bbox.left + deltaX + "px";
        element.style.top = bbox.top + deltaY + "px";
        element.style.transform = "translate3d(0px,0px,0px)";
        deltaX = deltaY = null;
        // handleEvent("6");
        console.log(element);
      }
    }
  }, [containerRef]);

  return (
    <div css={Style()} ref={containerRef} className={"container"}>
      {Object.keys(boxes).map((key) => {
        return <PBElement />;
      })}
    </div>
  );
};
