import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useItemsStoreInterface } from "../types/useItemStoreInterface";
import { ReactQuillInterface } from "../types/reactQuillInterface";

const initialState: ReactQuillInterface[] = [
];

export const useItemsStore = create<useItemsStoreInterface>()(
  devtools(
    (set) => ({
      items: [],
      isAddHeading: true,
      sideBarItem: {},
      currentItem: {},
      imgUrl: "",
      showImg: false,
      setShowImg: () => set((state) => ({ showImg: !state.showImg })),
      html: "",
      templateSize: 900,
      setTemplateSize: (size) =>
        set(() => ({ templateSize: size }), false, "setTemplateSize"),
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
          };

          return newItem;
        }),

      allClear: () => set(() => ({ items: initialState })),

      setItems: (newItem) =>
        set((state) => {
          const newState = { items: [...state.items, ...newItem] };
          return newState;
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
      setImgUrl: (url) => set({ imgUrl: url }),

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
      dragOn: false,
      setDragOn: () => set((state) => ({ dragOn: !state.dragOn })),

      setIsHeading: () => set((state) => ({isAddHeading: !state.isAddHeading})),

      setPositionCenter: (item) => set((state) => {
        return {
          items: state.items.map((i) => {
            if (i.id === item.id) {
              return { ...i, isPositionCenter: !i.isPositionCenter };
            }
            return i;
          }),
        }
      }),

      setColorBorder: (item) => set((state) => {
        return {
          items: state.items.map((i) => {
            if (i.id === item.id) {
              return { ...i, isBorderColor: !i.isBorderColor };
            }
            return i;
          }),
        }
      })

    }),
    { name: "items" }
  )
);
