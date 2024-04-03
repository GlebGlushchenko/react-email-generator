import { create } from 'zustand'
import { ReactQuillInterface } from '../App';
interface useDragStoreInterface {
  currentItem: ReactQuillInterface
  setCurrentItem: (obj: ReactQuillInterface) => void
  dragOn: boolean
  setDragOn: () => void
}

export const useDragStore = create<useDragStoreInterface>((set) => ({
  currentItem : {},
  dragOn: true,
  setCurrentItem: (obj) => set({currentItem: obj}),
  setDragOn: () => set((state) => ({ dragOn: !state.dragOn })),
}))



