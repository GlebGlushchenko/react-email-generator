import { create } from "zustand";
interface useSideBarStoreInterface {
  sideBarIsOpen: boolean;
  setOpenSideBar: (bol: boolean) => void;
  inputUrlValue: string;
  setInputUrlValue: (value: string) => void;
  inputTextValue: string;
  setInputTextValue: (value: string) => void
 
}
export const useSideBarStore = create<useSideBarStoreInterface>((set) => ({
  sideBarIsOpen: false,
  inputUrlValue: 'https://www.google.com/',
  inputTextValue: "Это кнопка!",
  setOpenSideBar: (bol) => set(() => ({ sideBarIsOpen: bol })),
  setInputUrlValue: (value) => set(() => ({inputUrlValue: value})),
  setInputTextValue: (value) => set(() => ({inputTextValue: value})),
 
}));