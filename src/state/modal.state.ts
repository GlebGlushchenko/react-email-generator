import { create } from 'zustand'
interface useModalInterface {
  iframeShow: boolean
  setIframeShow: (bol: boolean) => void
}

export const useModalStore = create<useModalInterface>((set) => ({
  iframeShow : false,
  setIframeShow: (bol) => set(() => ({iframeShow: bol}))
  

}))