import React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Section,
} from "@react-email/components";
import { sortItem } from "../src/utils/sortItem.js";
import MyRow from "../src/Components/MyRow.js";
import EmptyRow from "../src/Components/EmptyRow.js";
import MyButton from "../src/Components/MyButton.js";
import { ReactQuillInterface } from "../src/App.js";
import { useSideBarStore } from "../src/state/sideBar.state.js";
import { useItemsStore } from "../src/state/item.state.js";
import { useDragStore } from "../src/state/drag.state.js";

interface MyTemplateProps {
  size: number;
  content: ReactQuillInterface[];
  inputTextValue: string;
  inputUrlValue: string;
  addLinkButton: boolean;

  reactQuillValue?: ReactQuillInterface[];
  dragStartHandler?: (item: ReactQuillInterface) => void;
  dragEndHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragOn?: boolean;
  removeFragmentHandler?: () => void;
  setAddLinkButton?: (val: boolean) => void;
}
const MyTemplate: React.FC<MyTemplateProps> = (props) => {
  const {
    size,
    inputTextValue,
    inputUrlValue,
    addLinkButton,
    content,
    dragOn
  } = props;

  const setOpenSideBar = useSideBarStore(state => state.setOpenSideBar)

  const {setSideBarRedactorItem, setCurrentItem, chooseItem, changeOrder} = useItemsStore()

  const chooseItemHandler = (id: number) => {
    const findElement = content.find((i) => i.id === id);
    setOpenSideBar(true);

    setSideBarRedactorItem(findElement);
    chooseItem(id)
  };

  const dragStartHandler = (item: ReactQuillInterface) => {
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {
    e.target.classList.remove("drag-over");
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.classList.add("drag-over");
  };

  console.log(props.size)

  return (
    <>
      <Html lang="ru">
        <Head>
          <Font
            fontFamily="Arial, Helvetica, sans-serif"
            fallbackFontFamily="Arial"
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Body>
          <Container>
            <Heading as="h2">Здравствуйте, *|APPEAL_NAME|*!</Heading>
            {content.sort(sortItem).map((item) => {
              if (item.value !== "") {
                return (
                  <MyRow
                    item={item}
                    chooseItemHandler={chooseItemHandler}
                    dragStartHandler={dragStartHandler}
                    dropHandler={changeOrder}
                    dragEndHandler={dragEndHandler}
                    dragOverHandler={dragOverHandler}
                    dragOn={dragOn}
                    key={item.id}
                  />
                );
              }
              return (
                <EmptyRow
                  item={item}
                  size={size}
                  chooseItemHandler={chooseItemHandler}
                  dragStartHandler={dragStartHandler}
                  dropHandler={changeOrder}
                  dragEndHandler={dragEndHandler}
                  dragOverHandler={dragOverHandler}
                  dragOn={dragOn}
                  key={item.id}
                />
              );
            })}

            {addLinkButton && (
              <MyButton url={inputUrlValue} title={inputTextValue} />
            )}
          </Container>
        </Body>
      </Html>
    </>
  );
};

export default MyTemplate;
