import React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
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
  content: ReactQuillInterface[];
  addLinkButton: boolean;

  reactQuillValue?: ReactQuillInterface[];
  dragStartHandler?: (item: ReactQuillInterface) => void;
  dragEndHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
  dragOn?: boolean;
  removeFragmentHandler?: () => void;
  setAddLinkButton?: (val: boolean) => void;
  imgUrl: string
  showImg: boolean

  inputUrlValue?:string
  inputTextValue?: string
}
const MyTemplate: React.FC<MyTemplateProps> = (props) => {
  const {
    addLinkButton,
    content,
    imgUrl,
    showImg,
    inputUrlValue,
    inputTextValue
  } = props;

const {setOpenSideBar} = useSideBarStore()

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
  console.log('MY TEMPLATE RENDER')

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

            
          {showImg && <Img
            src={imgUrl === '' ? 'https://placehold.co/600x300' : imgUrl}
            alt="Обложка"
            height={300}
            style={{ margin: "auto" }}
          />}
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
              <MyButton url={inputUrlValue} title={inputTextValue}/>
            )}
          </Container>
        </Body>
      </Html>
    </>
  );
};

export default MyTemplate;
