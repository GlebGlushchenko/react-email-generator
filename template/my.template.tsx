import React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
} from "@react-email/components";
import { sortItem } from "../src/utils/sortItem.js";
import MyRow from "../src/Components/MyRow.js";
import EmptyRow from "../src/Components/EmptyRow.js";
import MyButton from "../src/Components/MyButton.js";
import { useSideBarStore } from "../src/state/sideBar.state.js";
import { useItemsStore } from "../src/state/item.state.js";
import { ReactQuillInterface } from "../src/types/reactQuillInterface.js";
interface MyTemplateProps {
  content: ReactQuillInterface[];
  addLinkButton: boolean;

  reactQuillValue?: ReactQuillInterface[];
  dragStartHandler?: (item: ReactQuillInterface) => void;
  dragEndHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  removeFragmentHandler?: () => void;
  imgUrl: string;
  showImg: boolean;
  isAddHeading: boolean;
  templateSize?: number;
  inputUrlValue?: string;
  inputTextValue?: string;
}
const MyTemplate: React.FC<MyTemplateProps> = (props) => {
  const {
    addLinkButton,
    content,
    imgUrl,
    showImg,
    inputUrlValue,
    inputTextValue,
    isAddHeading,
    templateSize,
  } = props;

  const { setOpenSideBar } = useSideBarStore();

  const { setSideBarRedactorItem, setCurrentItem, chooseItem, changeOrder } =
    useItemsStore();

  const chooseItemHandler = (id: number) => {
    const findElement = content.find((i) => i.id === id);
    setOpenSideBar(true);

    setSideBarRedactorItem(findElement);
    chooseItem(id);
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
          <Container style={{ padding: "15px", width: "680px" }}>
            {showImg && (
              <Img
                src={imgUrl === "" ? "https://placehold.co/600x300" : imgUrl}
                alt="Обложка"
                height={300}
                width={"680px"}
                style={{ margin: "auto", width: "680px" }}
              />
            )}
            {isAddHeading && (
              <Heading as="h2">Здравствуйте, *|APPEAL_NAME|*!</Heading>
            )}
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
                    key={item.id}
                  />
                );
              }
              return (
                <EmptyRow
                  item={item}
                  chooseItemHandler={chooseItemHandler}
                  dragStartHandler={dragStartHandler}
                  dropHandler={changeOrder}
                  dragEndHandler={dragEndHandler}
                  dragOverHandler={dragOverHandler}
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
