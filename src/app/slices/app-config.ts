import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import ThemeStorageService from "../services/theme-storage-service";

const setTheme = (theme: "dark" | "light") => {
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.remove("light");

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
};

export interface AppConfigState {
  theme: "dark" | "light";
}

let systemTheme: "dark" | "light";

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  systemTheme = 'dark';
} else {
  systemTheme = 'light';
}

const selectedTheme = ThemeStorageService.getTheme();
setTheme(selectedTheme || systemTheme);

const initialState: AppConfigState = {
  theme: selectedTheme || systemTheme,
};

export const appConfig = createSlice({
  name: "app-config",
  initialState,
  reducers: {
    changeTheme: (
      state,
      action: PayloadAction<"dark" | "light">
    ) => {
      ThemeStorageService.saveTheme(action.payload);
      state.theme = action.payload;
      setTheme(action.payload);
    },
  },
});

export const { changeTheme } = appConfig.actions;

export const selectTheme = (state: RootState) => state.appConfig.theme;

const { reducer } = appConfig;
export default reducer;