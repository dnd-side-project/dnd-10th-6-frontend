import { StateCreator, create } from 'zustand'

interface SettingStore {
  isHide: boolean
  setIsHide: (state: boolean) => void
  headerHeight: number
  setHeaderHeight: (height: number) => void
}

const createSettingSlice: StateCreator<SettingStore> = (set) => ({
  isHide: false,
  setIsHide: (state) => set({ isHide: state }),
  headerHeight: 0,
  setHeaderHeight: (height) => set({ headerHeight: height }),
})

export const useSettingStore = create<SettingStore>((...a) => ({
  ...createSettingSlice(...a),
}))
