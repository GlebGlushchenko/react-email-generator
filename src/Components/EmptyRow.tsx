import { Column, Row } from "@react-email/components";
import { useDragStore } from "../state/drag.state";

const EmptyRow = (props) => {
  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
    chooseItemHandler,
    item,
  } = props;
  const { dragOn } = useDragStore();

  return (
    <Row
      onDragStart={() => dragStartHandler(item)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, item)}
      draggable={dragOn}
      key={item.id}
    >
      <Column
        style={{ padding: "10px 0" }}
        className={`column empty ${item.isActive ? "active" : ""}`}
        onClick={() => chooseItemHandler(item.id)}
      ></Column>
    </Row>
  );
};

export default EmptyRow;
