import { create } from "zustand";
import { ReactQuillInterface } from "../App";
interface useItemsStoreInterface {
  items: ReactQuillInterface[];
  sideBarItem: {};
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
  setCurrentItem: (obj: ReactQuillInterface) => void;
}

const initialState: ReactQuillInterface[] = [
  { id: 1, value: "Это параграф!", ItsShow: true, order: 1, isActive: false },
];

export const useItemsStore = create<useItemsStoreInterface>((set) => ({
  items: [],
  sideBarItem: {},
  currentItem: {},
  html: "",
  templateSize: 900,
  setTemplateSize: (size) => set(() => ({ templateSize: size })),
  setHtml: (str) => set(() => ({ html: str })),
  addText: () =>
    set((state) => {
      const newItem = {
        items: [
          ...state.items,
          {
            id: Date.now(),
            value: "",
            ItsShow: false,
            order: Date.now(),
            isActive: false,
          },
        ],
      }
     
      return newItem
    }),

  allClear: () => set(() => ({ items: initialState })),

  setItems: (newItem) =>
    set((state) => {
      const newState = {items: [...state.items, ...newItem],}
      return newState
    }),

  chooseItem: (id: number) =>
    set((state) => {
      return {
        items: state.items.map((i) => ({
          ...i,
          isActive: i.id === id ? true : false,
        })),
      };
    }),

  setSideBarRedactorItem: (newObject) => set({ sideBarItem: newObject }),

  setSideBarItemValue: (newValue) =>
    set((state) => ({
      sideBarItem: { ...state.sideBarItem, value: newValue },
    })),

  changeFragment: (newObj) =>
    set((state) => {
      return {
        items: state.items.map((i) => {
          if (i.id === newObj.id) {
            return { ...i, value: newObj.value };
          }
          return i;
        }),
      };
    }),

  removeFragmentHandler: (obj) =>
    set((state) => {
      return {
        items: state.items.filter((i) => i.id !== obj.id),
        sideBarItem: {},
      };
    }),

  setCurrentItem: (newObject) => set({ currentItem: newObject }),

  changeOrder: (e, item) =>
    set((state: any) => {
      e.preventDefault();
      e.target.classList.remove("drag-over");
      return {
        items: state.items.map((i) => {
          if (i.id === item.id) {
            const x = { ...i, order: state.currentItem.order };
            return x;
          }

          if (i.id === state.currentItem.id) {
            const y = { ...i, order: item.order };
            return y;
          }
          return i;
        }),
      };
    }),
}));
