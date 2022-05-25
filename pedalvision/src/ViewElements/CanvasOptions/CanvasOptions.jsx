import { Style } from "./CanvasOptions.css";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { changeLayoutSize, adjustLayoutToElements } from "./functions";
import { BiUpload } from "react-icons/bi";
import { AiOutlineSave, AiOutlineArrowUp } from "react-icons/ai";
import { MdHeight } from "react-icons/md";
import { IoIosResize } from "react-icons/io";
import { BsFillFileImageFill, BsArrowsAngleContract } from "react-icons/bs";
import {
  ButtonCustom,
  InputNumberCustom,
  InputCheckboxCustom,
  SwitchCustom,
} from "../../Components";
import { CSSTransition } from "../../utils/GeneralImports";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import ReactTooltip from "react-tooltip";

export const CanvasOptions = ({
  setPbAreaSize,
  pedalboardData,
  scale,
  unitFactor,
  pbAreaSize,
  className,
  setUnitFactor,
  setScale,
  fitToWidth,
  fitToHeight,
  htmlDrag,
  setHtmlDrag,
  setFitToHeight,
  setFitToWidth,
  fillEmptySpace,
  autofillEmpty,
  setAutofillEmpty,
  setPedalboardData,
}) => {
  const [editOptions, setEditOptions] = useState(false);
  const preAdjustLayoutToElements = (type = "both") => {
    adjustLayoutToElements(
      type,
      setPbAreaSize,
      pedalboardData,
      scale,
      unitFactor,
      pbAreaSize
    );
  };

  const preChangeLayoutSize = (value, type) => {
    changeLayoutSize(
      value / unitFactor,
      type,
      pedalboardData,
      scale,
      setPbAreaSize,
      pbAreaSize
    );
  };

  const saveImg = useCallback(async () => {
    const canvas = await html2canvas(
      document.getElementById("pedalboardAreaContainer")
    );
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  }, []);

  const downloadData = () => {
    const element = document.createElement("a");

    let ejemplo = {
      pedalboardData: JSON.parse(localStorage.getItem("pedalboardData")),
      pbAreaSize: JSON.parse(localStorage.getItem("pbAreaSize")),
      scale: JSON.parse(localStorage.getItem("scale")),
    };

    const textFile = new Blob([JSON.stringify(ejemplo)], {
      type: "text/plain",
    }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    element.download = "pedalboard.json";
    document.body.appendChild(element);
    element.click();
  };

  //To be able to upload the same time n times
  useEffect(() => {
    let fileChooser = document.getElementById("fileChooser");
    fileChooser.onclick = function () {
      this.value = "";
    };
    fileChooser.onchange = function () {};
  }, []);

  const loadPB = (data) => {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        let pbData = JSON.parse(reader.result);
        setPbAreaSize(pbData.pbAreaSize);
        setScale(pbData.scale);
        setPedalboardData(pbData.pedalboardData);
      },
      false
    );
    reader.readAsText(data);
  };

  const inputFile = useRef(null);
  return (
    <div css={Style()} className={`canvasOptions ${className}`}>
      <div className="topSec section">
        <div className="leftArea">
          <h2>Canvas ({unitFactor === "1" ? "in" : "cm"})</h2>
        </div>
        <div className="rightArea">
          <BsFillFileImageFill
            data-tip="Download image"
            onClick={() => saveImg()}
          />
          {/* <AiOutlineFilePdf /> */}

          <AiOutlineSave
            data-tip="Download pedalboard data"
            onClick={() => downloadData()}
          />
          <ReactTooltip place="bottom" type="dark" effect="float" />
          <input
            type="file"
            id="fileChooser"
            ref={inputFile}
            style={{ display: "none" }}
            accept=".json"
            onChange={(e) => loadPB(e.target.files[0])}
          />
          <BiUpload
            className="upload"
            data-tip="Load pedalboard"
            onClick={(e) => inputFile.current.click()}
          />
        </div>
      </div>
      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="row">
          <p>Units:</p>
          <SwitchCustom
            activeSide={unitFactor === "1" ? "left" : "right"}
            leftValue={"in"}
            leftAction={() => setUnitFactor("1")}
            rightValue={"cm"}
            rightAction={() => setUnitFactor("2.54")}
          />
        </div>
      </CSSTransition>

      <div className="row rowInput">
        <p className="rowDes">
          {" "}
          Scale ({unitFactor === "2.54" ? "centimeters" : "inches"} per pixel):
        </p>
        <CSSTransition
          in={!editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <p>{scale.toFixed(2)}</p>
        </CSSTransition>
        <CSSTransition
          in={editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <>
            <InputNumberCustom
              name={"lastName"}
              value={scale.toFixed(2)}
              onChange={(e) => setScale(e.target.value)}
              disabled={fitToWidth || fitToHeight}
              dir={"rtl"}
            />
          </>
        </CSSTransition>
      </div>

      <div className="row rowInput">
        <p className="rowDes">Width:</p>
        <CSSTransition
          in={!editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <p>{(pbAreaSize.width * unitFactor).toFixed(2)}</p>
        </CSSTransition>
        <CSSTransition
          in={editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <InputNumberCustom
            dir="rtl"
            name="lastName"
            value={(pbAreaSize.width * unitFactor).toFixed(2)}
            onChange={(e) => {
              preChangeLayoutSize(e.target.value, "width");
            }}
          />
        </CSSTransition>
      </div>

      <div className="row rowInput">
        <p className="rowDes">Height:</p>

        <CSSTransition
          in={!editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <p>{(pbAreaSize.height * unitFactor).toFixed(2)}</p>
        </CSSTransition>
        <CSSTransition
          in={editOptions}
          timeout={200}
          classNames={"increaseAnimation"}
          unmountOnExit
        >
          <InputNumberCustom
            dir="rtl"
            name="lastName"
            value={(pbAreaSize.height * unitFactor).toFixed(2)}
            onChange={(e) => {
              preChangeLayoutSize(e.target.value, "height");
            }}
          />
        </CSSTransition>
      </div>

      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="section">
          <div className="row">
            Fit to View
            <SwitchCustom
              activeSide={fitToWidth ? "left" : fitToHeight ? "right" : ""}
              leftValue={"width"}
              leftAction={() => {
                setFitToWidth(!fitToWidth);
                setFitToHeight(false);
              }}
              rightValue={"height"}
              rightAction={() => {
                setFitToHeight(!fitToHeight);
                setFitToWidth(false);
              }}
            />
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="section fillsSec">
          <div className="row">Adjust canvas to last elements:</div>
          {/* <ReactTooltip place="bottom" type="dark" effect="float" /> */}
          <div className="row">
            <ReactTooltip place="bottom" type="dark" effect="float" />
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => preAdjustLayoutToElements("both")}
              dataTip="Adjust to width and height"
            >
              <BsArrowsAngleContract
                size={15}
                data-tip="Adjust to width and height"
              />
            </ButtonCustom>
            <ReactTooltip place="bottom" type="dark" effect="float" />
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => preAdjustLayoutToElements("width")}
              dataTip="Adjust to width"
            >
              <BsArrowsAngleContract
                size={15}
                style={{ transform: "rotate(45deg)" }}
              />
            </ButtonCustom>
            <ReactTooltip place="bottom" type="dark" effect="float" />
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => preAdjustLayoutToElements("height")}
              dataTip="Adjust to height"
            >
              <BsArrowsAngleContract
                size={11}
                style={{ transform: "rotate(135deg)", padding: ".05rem" }}
              />
            </ButtonCustom>
          </div>
          <div className="row">Fill empty space:</div>
          <div className="row">
            <ReactTooltip place="bottom" type="dark" effect="float" />
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => fillEmptySpace()}
              dataTip="Fill to available width and height"
            >
              <IoIosResize size={15} />
            </ButtonCustom>
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => fillEmptySpace("width")}
              dataTip="Fill to available width"
            >
              <MdHeight size={15} style={{ transform: "rotate(90deg)" }} />
            </ButtonCustom>
            <ButtonCustom
              className={"optionsBtn"}
              onClick={() => fillEmptySpace("height")}
              dataTip="Fill to available height"
            >
              <MdHeight size={15} />
            </ButtonCustom>
          </div>
          <label className="row">
            Autofill empty space
            <InputCheckboxCustom
              checked={autofillEmpty}
              onChange={() => setAutofillEmpty(!autofillEmpty)}
            />
          </label>
        </div>
      </CSSTransition>
      <CSSTransition
        in={editOptions}
        timeout={200}
        classNames={"increaseAnimation"}
        unmountOnExit
      >
        <div className="section helpSec">
          <p>It's something wrong with the Drag N Drop?</p>

          <label className="rowLabel">
            <InputCheckboxCustom
              checked={htmlDrag}
              onChange={() => setHtmlDrag(!htmlDrag)}
            />
            Active HTML 5 DND
          </label>
        </div>
      </CSSTransition>

      <ButtonCustom
        // style={editOptions ? { backgroundColor: "#8aa8d3" } : {}}
        onClick={() => setEditOptions(!editOptions)}
        type="submit"
        className={editOptions ? "greyBtn" : ""}
      >
        {editOptions ? (
          <>
            {" "}
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AiOutlineArrowUp />
              Hide Options
            </p>
          </>
        ) : (
          <>Edit Canvas</>
        )}
      </ButtonCustom>
    </div>
  );
};
