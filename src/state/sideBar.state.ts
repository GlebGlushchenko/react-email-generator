import { create } from "zustand";
interface useSideBarStoreInterface {
  sideBarIsOpen: boolean;
  setOpenSideBar: (bol: boolean) => void;
}

export const useSideBarStore = create<useSideBarStoreInterface>((set) => ({
  sideBarIsOpen: false,
  setOpenSideBar: (bol) => set(() => ({ sideBarIsOpen: bol })),
}));
