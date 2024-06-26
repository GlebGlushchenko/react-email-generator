import React, { useState } from "react";
import MyTemplate from "../template/my.template";
import { useItemsStore } from "./state/item.state";
import "react-quill/dist/quill.snow.css";
import Modal from "./Components/Modal";
import SideBar from "./Components/SideBar";
import { useModalStore } from "./state/modal.state";
import { useSideBarStore } from "./state/sideBar.state";
import ControlItem from "./Components/ControlItem";

export default function App() {
  const [addLinkButton, setAddLinkButton] = useState(false);

  const setAddLinkButtonHandler = () => {
    setAddLinkButton((prev) => !prev);
  };

  const {
    templateSize,
    html,
    items,
    addText,
    setItems,
    showImg,
    setShowImg,
    imgUrl,
    setIsHeading,
    isAddHeading,
  } = useItemsStore();

  const { iframeShow } = useModalStore();
  const { inputTextValue, inputUrlValue } = useSideBarStore();

  React.useEffect(() => {
    const data: [] | null | string = localStorage.getItem("ReactState");
    const x = JSON.parse(data);
    if (x === null || x === "" || x.length === 0 || x === "[]") {
      setItems(items);
      return;
    }
    setItems(x);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("ReactState", JSON.stringify(items));
  }, [items]);

  return (
    <div className="wrapper">
      {iframeShow && <Modal html={html} />}
      <SideBar addLinkButton={addLinkButton} />
      <div className="inner">
        <h2>Это шаблон простого письма</h2>
        <div style={{ width: `${templateSize}px` }} className="inner-border">
          <MyTemplate
            content={items}
            imgUrl={imgUrl}
            showImg={showImg}
            addLinkButton={addLinkButton}
            inputTextValue={inputTextValue}
            inputUrlValue={inputUrlValue}
            isAddHeading={isAddHeading}
          />
          <div className="control-btn">
            <ControlItem title={"Добавить параграф"} clickHandler={addText} />
            <ControlItem
              moreTitle={"кнопку"}
              clickHandler={setAddLinkButtonHandler}
              colorSwitch={addLinkButton}
            />
            <ControlItem
              moreTitle={"обложку"}
              clickHandler={setShowImg}
              colorSwitch={showImg}
            />
            <ControlItem
              moreTitle={"заголовок"}
              clickHandler={setIsHeading}
              colorSwitch={isAddHeading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
