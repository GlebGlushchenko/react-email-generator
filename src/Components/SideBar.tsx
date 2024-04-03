import React from "react";
import ReactQuill from "react-quill";
import "../style/SideBar.css";
import { useItemsStore } from "../state/item.state";
import { useSideBarStore } from "../state/sideBar.state";
import MyTemplate from "../../template/my.template";
import { render } from "@react-email/components";
import { downloadFile } from "../utils/downloadFile";
import { useModalStore } from "../state/modal.state";

interface SideBarProps {
  setDragOn: (drag: boolean) => void;
  dragOn: boolean;
  inputUrlValue: string;
  setInputUrlValue: (targetValue: string) => void;
  inputTextValue: string;
  setInputTextValue: (targetValue: string) => void;
  addLinkButton: boolean;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const {
    setDragOn,
    dragOn,
    inputUrlValue,
    setInputUrlValue,
    inputTextValue,
    setInputTextValue,
    addLinkButton,
  } = props;

  const {
    items,
    setHtml,
    allClear,
    sideBarItem,
    changeFragment,
    removeFragmentHandler,
    setSideBarItemValue,
    templateSize,
    setTemplateSize,
  } = useItemsStore()

  const { iframeShow, setIframeShow } = useModalStore()

  const { setOpenSideBar, sideBarIsOpen } = useSideBarStore()
  
  const renderHtml = () => {
    const emailHTML = render(
      <MyTemplate
        size={templateSize}
        content={items}
        inputTextValue={inputTextValue}
        inputUrlValue={inputUrlValue}
        addLinkButton={addLinkButton}
      />
    );

    downloadFile(emailHTML, "email.html");
  };

  
  const renderPreview = () => {
    const emailHTML = render(
      <MyTemplate
        size={templateSize}
        content={items}
        inputTextValue={inputTextValue}
        inputUrlValue={inputUrlValue}
        addLinkButton={addLinkButton}
      />
    );

    setHtml(emailHTML);
  };

  const showIframe = () => {
    renderPreview();
    setIframeShow(!iframeShow);
  };

  const choseTemplateSize = (format: string) => {
    format === "mobile" ? setTemplateSize(400) : setTemplateSize(900);
  };

  return (
    <div className={`side-bar ${sideBarIsOpen ? "open" : ""}`}>
      <nav className="nav">
        <ul className="nav-page-size">
          <li>
            <button onClick={() => setOpenSideBar(false)}>Закрыть</button>
          </li>
          <li>
            <button onClick={() => choseTemplateSize("mobile")}>📱</button>
          </li>
          <li>
            <button onClick={() => choseTemplateSize("desktop")}>🖥️</button>
          </li>
        </ul>
        <ul className="nav-page-control">
          <li>
            <button onClick={showIframe}>Результат</button>
          </li>
          <li>
            <button onClick={renderHtml}>Получить HTML</button>
          </li>
          <li>
            <button onClick={allClear}>Очистить</button>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => setDragOn(!dragOn)}
        className={`${dragOn ? "drag-on" : ""}`}
      >{`drag and drop - ${dragOn ? " Включён" : "Выключен"}`}</button>
      <p>Редактирование</p>

      <div className="side-bar-redactor">
        <ReactQuill
          theme={"bubble"}
          onChange={setSideBarItemValue}
          value={sideBarItem.value}
        ></ReactQuill>
      </div>
      <div className="side-bar-controls">
        <div>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => changeFragment(sideBarItem)}
        >
          OK
        </button>
        <button onClick={() => removeFragmentHandler(sideBarItem)}>
          Удалить
        </button>
        </div>
        
        {addLinkButton && (
          <div className="input-control">
            <input
              className="input-control-item"
              value={inputTextValue}
              onChange={(e) => setInputTextValue(e.target.value)}
              type="text"
              placeholder="Текст для кнопки..."
            />
            <input
              className="input-control-item"
              value={inputUrlValue}
              onChange={(e) => setInputUrlValue(e.target.value)}
              type="text"
              placeholder="URL..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
