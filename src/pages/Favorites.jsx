import React from "react";
import { useSelector } from "react-redux";
import FavoritesTable from "../components/FavoritesTable";
import light from "../pages/images/light.gif";
import dark from "../pages/images/dark.gif";

const Favorites = () => {
  const darkThemeSlice = useSelector((state) => state.theme);
  return (
    <div
      style={{
        backgroundImage:
          darkThemeSlice === "dark" ? `url(${dark})` : `url(${light})`,
      }}
      className={
        darkThemeSlice !== "dark" ? "brightness hero" : "darkness hero"
      }
    >
      <FavoritesTable />
    </div>
  );
};
export default Favorites;
