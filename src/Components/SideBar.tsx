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
  addLinkButton: boolean;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const { addLinkButton } = props;

  const {
    items,
    setHtml,
    allClear,
    sideBarItem,
    changeFragment,
    removeFragmentHandler,
    setSideBarItemValue,
  } = useItemsStore();

  const { iframeShow, setIframeShow } = useModalStore();

  const {
    setOpenSideBar,
    sideBarIsOpen,
    setInputUrlValue,
    inputUrlValue,
    inputTextValue,
    setInputTextValue,
  } = useSideBarStore();
  const {
    showImg,
    setImgUrl,
    imgUrl,
    dragOn,
    setDragOn,
    isAddHeading,
    setPositionCenter,
    setColorBorder,
  } = useItemsStore();

  const renderHtml = () => {
    const emailHTML = render(
      <MyTemplate
        content={items}
        addLinkButton={addLinkButton}
        showImg={showImg}
        imgUrl={imgUrl}
        inputUrlValue={inputUrlValue}
        inputTextValue={inputTextValue}
        isAddHeading={isAddHeading}
      />
    );

    downloadFile(emailHTML, "email.html");
  };

  const renderPreview = () => {
    const emailHTML = render(
      <MyTemplate
        content={items}
        addLinkButton={addLinkButton}
        showImg={showImg}
        imgUrl={imgUrl}
        inputUrlValue={inputUrlValue}
        inputTextValue={inputTextValue}
        isAddHeading={isAddHeading}
      />
    );

    setHtml(emailHTML);
  };

  const showIframe = () => {
    renderPreview();
    setIframeShow(!iframeShow);
  };

  return (
    <div className={`side-bar ${sideBarIsOpen ? "open" : ""}`}>
      <div>
        <nav className="nav">
          <ul className="nav-page-size">
            <li>
              <button onClick={() => setOpenSideBar(false)}>Закрыть</button>
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
          onClick={setDragOn}
          className={`${dragOn ? "drag-on" : ""}`}
        >{`drag and drop - ${dragOn ? " Включён" : "Выключен"}`}</button>
        <p>Редактирование</p>
        <div className="side-bar-redactor">
          <ReactQuill
            theme={"bubble"}
            onChange={setSideBarItemValue}
            value={sideBarItem.value}
            placeholder=" 👈 - - - - Это разделитель - - - - 👉 "
          ></ReactQuill>
        </div>
        <div className="side-bar-controls-text">
          <button onClick={() => setPositionCenter(sideBarItem)}>
            По центру
          </button>
          <button onClick={() => setColorBorder(sideBarItem)}>
            Добавить рамку
          </button>
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
          {showImg && (
            <div className="input-control">
              <input
                className="input-control-item"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                type="text"
                placeholder="Ссылка на картинку..."
              />
            </div>
          )}
        </div>
      </div>
      <div className="copyright">
        <span>Idea and implementation Gleb Glushchenko ©</span>
        <span>
          <a href="mailto:GlebGlushchenk0@yandex.ru">
            GlebGlushchenk0@yandex.ru
          </a>
        </span>
      </div>
    </div>
  );
};

export default SideBar;
