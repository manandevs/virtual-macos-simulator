import { create } from "zustand";
import { produce } from "immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@constants";

const useWindowStore = create((set) => ({
  windows: WINDOW_CONFIG,
  nextZIndex: INITIAL_Z_INDEX + 1,
  
  // System UI State
  systemOverlay: {
    appleMenu: false,
    controlCenter: false,
    spotlight: false,
    calendar: false,
  },

  toggleSystemOverlay: (key) => {
    set(produce((state) => {
      const targetState = !state.systemOverlay[key];
      // Close all others
      Object.keys(state.systemOverlay).forEach(k => state.systemOverlay[k] = false);
      state.systemOverlay[key] = targetState;
    }));
  },

  closeAllOverlays: () => {
    set(produce((state) => {
      Object.keys(state.systemOverlay).forEach(k => state.systemOverlay[k] = false);
    }));
  },

  openWindow: (windowKey, data = null) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      if (win) {
        // If minimized, restore it
        if (win.isMinimized) {
          win.isMinimized = false;
        }
        win.isOpen = true;
        win.zIndex = state.nextZIndex++;
        if (data) win.data = data;
        state.systemOverlay.spotlight = false;
      }
    }));
  },

  closeWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      if (win) {
        win.isOpen = false;
        win.isMinimized = false;
        win.isMaximized = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }
    }));
  },

  minimizeWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      if (win) win.isMinimized = true;
    }));
  },

  toggleMaximizeWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      if (win) {
          win.isMaximized = !win.isMaximized;
          win.zIndex = state.nextZIndex++;
      }
    }));
  },

  focusWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      if (win && win.isOpen) {
        win.zIndex = state.nextZIndex++;
        // If focused via click, restore if minimized
        win.isMinimized = false; 
      }
    }));
  },
}));

export default useWindowStore;