import { create } from "zustand";
import {produce} from "immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@constants";

const useWindowStore = create((set) => ({
  windows: WINDOW_CONFIG,
  nextZIndex: INITIAL_Z_INDEX + 1,

  openWindow: (windowKey, data = null) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      win.isOpen = true;
      win.zIndex = state.nextZIndex++;
      win.data = data ?? win.data;
    }));
  },

  closeWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      win.isOpen = false;
      win.zIndex = INITIAL_Z_INDEX;
      win.data = null;
    }));
  },

  focusWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      win.zIndex = state.nextZIndex++;
    }));
  },
}));

export default useWindowStore;
