import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import ThemeStorageService from "../services/theme-storage-service";
import StorageService from "../services/storage-service";
import { SIDEBAR_COLLAPSED } from "../constants/global";

const setTheme = (theme: "dark" | "light") => {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.remove("light");

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
};

export interface AppConfigState {
  theme: "dark" | "light";
  menuVisible: boolean;
  sidebarCollapsed: boolean;
}

let systemTheme: "dark" | "light";

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  systemTheme = 'dark';
} else {
  systemTheme = 'light';
}

const selectedTheme = ThemeStorageService.getTheme();
setTheme(selectedTheme || systemTheme);

const sidebarCollapsed = StorageService.getItem(SIDEBAR_COLLAPSED) === 'Y';

const initialState: AppConfigState = {
  theme: selectedTheme || systemTheme,
  menuVisible: false,
  sidebarCollapsed: sidebarCollapsed || false
};

export const appConfig = createSlice({
  name: "app-config",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"dark" | "light">) => {
      ThemeStorageService.saveTheme(action.payload);
      state.theme = action.payload;
      setTheme(action.payload);
    },
    setMenuVisible: (state, action: PayloadAction<boolean>) => {
      state.menuVisible = action.payload
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      const collapsed = action.payload ? 'Y' : 'N';
      StorageService.setItem(SIDEBAR_COLLAPSED, collapsed);
      state.sidebarCollapsed = action.payload
    },
  },
});

export const { changeTheme, setMenuVisible, setSidebarCollapsed } = appConfig.actions;

export const selectTheme = (state: RootState) => state.appConfig.theme;
export const selectSidebarCollapsed = (state: RootState) => state.appConfig.sidebarCollapsed;
export const selectMenuVisible = (state: RootState) => state.appConfig.menuVisible;

const { reducer } = appConfig;
export default reducer;
