import { create } from "zustand";
import { produce } from "immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@constants";

const useWindowStore = create((set) => ({
  windows: WINDOW_CONFIG,
  nextZIndex: INITIAL_Z_INDEX + 1,
  
  // System UI State
  systemOverlay: {
    spotlight: false,
    controlCenter: false, // Added for future expansion
  },

  toggleSystemOverlay: (key) => {
    set(produce((state) => {
      // Close other overlays when opening one
      const others = Object.keys(state.systemOverlay).filter(k => k !== key);
      others.forEach(k => state.systemOverlay[k] = false);
      state.systemOverlay[key] = !state.systemOverlay[key];
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
        win.isOpen = true;
        win.isMinimized = false;
        // Bring to front immediately
        win.zIndex = state.nextZIndex++;
        if (data) win.data = data;
        
        // Close Spotlight if a window is opened via it
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
        win.data = null; 
      }
    }));
  },

  minimizeWindow: (windowKey) => {
    set(produce((state) => {
      if (state.windows[windowKey]) {
        state.windows[windowKey].isMinimized = true;
      }
    }));
  },

  toggleMaximizeWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      if (win) {
          win.isMaximized = !win.isMaximized;
          // Bring to front when maximizing
          win.zIndex = state.nextZIndex++;
      }
    }));
  },

  focusWindow: (windowKey) => {
    set(produce((state) => {
      const win = state.windows[windowKey];
      if (win && win.isOpen) {
        // Only increment z-index if it's not already the highest
        if (win.zIndex !== state.nextZIndex - 1) {
            win.zIndex = state.nextZIndex++;
        }
        win.isMinimized = false; 
      }
    }));
  },
}));

export default useWindowStore;