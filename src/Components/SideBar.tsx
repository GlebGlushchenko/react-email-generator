import React from "react";
import ReactQuill from "react-quill";
import { ReactQuillInterface } from "../App";
import '../style/SideBar.css'

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  choseTemplateSize: (format: string) => void;
  showIframe: () => void;
  renderHtml: () => void;
  clearHandler: () => void;
  setDragOn: (drag: boolean) => void;
  dragOn: boolean;
  onChangeHandler: (val: string) => void;
  siteBarRedactorValue: ReactQuillInterface;
  changeFragment: (obj: ReactQuillInterface) => void;
  removeFragmentHandler?: (item: ReactQuillInterface) => void;
  inputUrlValue: string
  setInputUrlValue: (targetValue: string) => void
  inputTextValue: string
  setInputTextValue: (targetValue: string) => void
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const {
    isOpen,
    setIsOpen,
    choseTemplateSize,
    showIframe,
    renderHtml,
    clearHandler,
    setDragOn,
    dragOn,
    onChangeHandler,
    siteBarRedactorValue,
    changeFragment,
    removeFragmentHandler,
    inputUrlValue,
    setInputUrlValue,
    inputTextValue,
    setInputTextValue
  } = props;
  return (
    <div className={`side-bar ${isOpen ? "open" : ""}`}>
      <nav className="nav">
        <ul className="nav-page-size">
          <li>
            <button onClick={() => setIsOpen(false)}>Закрыть</button>
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
            <button onClick={clearHandler}>Очистить</button>
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
          onChange={onChangeHandler}
          value={siteBarRedactorValue?.value}
        ></ReactQuill>
      </div>
      <div style={{ marginTop: "50px" }}>
        <button
          style={{ marginRight: "10px" }}
          onClick={() => changeFragment(siteBarRedactorValue)}
        >
          OK
        </button>
        <button onClick={() => removeFragmentHandler(siteBarRedactorValue)}>
          Удалить
        </button>
        <div className="input-control">
        <input className="input-control-item" value={inputTextValue} onChange={(e) => setInputTextValue(e.target.value)} type="text" placeholder="Текст для кнопки..." />
        <input className="input-control-item" value={inputUrlValue} onChange={(e) => setInputUrlValue(e.target.value)} type="text" placeholder="URL..." />
        </div>
        
      </div>
    </div>
  );
};

export default SideBar;
