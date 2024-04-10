import React from "react";

interface ControlItemProps {
  clickHandler:() => void
  moreTitle?: string
  colorSwitch?: boolean
  title?: string
}

const ControlItem: React.FC<ControlItemProps> = ({clickHandler, moreTitle, colorSwitch, title}) => {

  return (
      <button
        className="btn"
        onClick={() => clickHandler()}
        style={{
          backgroundColor: ` ${colorSwitch ? "#e39d98" : ""}`,
        }}
      >
       {title ? title : `${colorSwitch ? "Удалить" : "Добавить"} ${moreTitle}`}
      </button>
  );
};

export default ControlItem;
