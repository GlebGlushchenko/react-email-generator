import { Column, Row } from "@react-email/components";

const EmptyRow = (props) => {
  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
    addItemHandler,
    dragOn,
    item,
  } = props;

  return (
    <Row
      onDragStart={(e) => dragStartHandler(e, item)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, item)}
      draggable={dragOn}
      key={item.id}
    >
      <Column
        style={{ padding: "10px 0" }}
        className={`column ${item.value === "" ? "empty" : ""}`}
        onClick={() => addItemHandler(item.id)}
      ></Column>
    </Row>
  );
};

export default EmptyRow;
