import { createSlice } from "@reduxjs/toolkit";

const darkThemeSlice = createSlice({
  name: "theme",
  initialState: "dark",
  reducers: {
    toggleTheme(state) {
      if (state === "dark") {
        return (state = "light");
      }
      if (state === "light") {
        return (state = "dark");
      }
    },
  },
});

export const darkThemeActions = darkThemeSlice.actions;

export default darkThemeSlice;
