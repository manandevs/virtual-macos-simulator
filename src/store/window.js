import { create } from "zustand";
import { produce } from "immer";

const INITIAL_Z = 1000;

const initialWindows = {
  finder: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  safari: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  contact: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  resume: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  photos: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  trash: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  txtfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
  imgfile: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: INITIAL_Z },
};

export const useWindowStore = create((set) => ({
  windows: initialWindows,
  nextZIndex: INITIAL_Z + 1,
  focusedWindow: null,
  
  systemOverlay: {
    spotlight: false,
  },

  openWindow: (id) =>
    set(
      produce((state) => {
        if (state.windows[id]) {
          state.windows[id].isOpen = true;
          state.windows[id].isMinimized = false;
          state.windows[id].zIndex = state.nextZIndex++;
          state.focusedWindow = id;
          state.systemOverlay.spotlight = false; 
        }
      })
    ),

  closeWindow: (id) =>
    set(
      produce((state) => {
        if (state.windows[id]) {
          state.windows[id].isOpen = false;
          state.windows[id].isMaximized = false;
          if (state.focusedWindow === id) state.focusedWindow = null;
        }
      })
    ),

  minimizeWindow: (id) =>
    set(
      produce((state) => {
        if (state.windows[id]) {
          state.windows[id].isMinimized = true;
          if (state.focusedWindow === id) state.focusedWindow = null;
        }
      })
    ),

  maximizeWindow: (id) =>
    set(
      produce((state) => {
        if (state.windows[id]) {
          state.windows[id].isMaximized = !state.windows[id].isMaximized;
          state.windows[id].zIndex = state.nextZIndex++;
          state.focusedWindow = id;
        }
      })
    ),

  focusWindow: (id) =>
    set(
      produce((state) => {
        if (state.windows[id] && state.focusedWindow !== id) {
          state.windows[id].zIndex = state.nextZIndex++;
          state.focusedWindow = id;
          state.windows[id].isMinimized = false;
        }
      })
    ),

  toggleSystemOverlay: (key) =>
    set(
      produce((state) => {
        state.systemOverlay[key] = !state.systemOverlay[key];
      })
    ),

  closeAllOverlays: () =>
    set(
      produce((state) => {
        state.systemOverlay.spotlight = false;
      })
    ),
}));