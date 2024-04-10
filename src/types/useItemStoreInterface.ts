import { ReactQuillInterface } from "./reactQuillInterface";

export interface useItemsStoreInterface {
  items: ReactQuillInterface[];
  sideBarItem: ReactQuillInterface;
  templateSize: number;
  setTemplateSize: (size: number) => void;
  html: string;
  setHtml: (str: string) => void;
  addText: () => void;
  allClear: () => void;
  setItems: (newItem?: ReactQuillInterface[]) => void;
  chooseItem: (id: number) => void;
  removeFragmentHandler: (obj: ReactQuillInterface) => void;
  setSideBarRedactorItem: (obj: ReactQuillInterface) => void;
  changeFragment: (obj: ReactQuillInterface) => void;
  setSideBarItemValue: (value: string) => void;
  changeOrder: (e: any, obj: ReactQuillInterface) => void;
  currentItem: {};
  imgUrl: string;
  setShowImg: () => void;
  showImg: boolean;
  setImgUrl: (url: string) => void;
  setCurrentItem: (obj: ReactQuillInterface) => void;
  dragOn: boolean;
  isAddHeading: boolean;
  setDragOn: () => void;
  setIsHeading: () => void;
  setPositionCenter: (item: ReactQuillInterface) => void
  setColorBorder: (item: ReactQuillInterface) => void
}