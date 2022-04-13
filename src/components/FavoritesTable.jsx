import React, { useCallback, useState, useEffect } from "react";
import classes from "./FavoritesTable.module.css";
import FavCard from "./Cards/FavCard";
import { getLoaclStorage, saveToLocalStorage } from "../helpers/localStorage";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notification-slice";

const FavoritesTable = () => {
  const [favorites, setFavorites] = useState([]);
  const favoriteCities = getLoaclStorage();
  const dispatch = useDispatch();
  const removeFromFav = useCallback(
    (favCity) => {
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Action completed",
          message: "Added to favorites successfully!",
        })
      );
      const exist = favorites.find((city) => city.cityKey === favCity.cityKey);

      if (exist)
        setFavorites(
          favorites.filter((city) => city.cityKey !== favCity.cityKey)
        );
    },
    [favorites]
  );

  useEffect(() => setFavorites(favoriteCities), []);

  useEffect(() => saveToLocalStorage(favorites), [favorites]);

  return (
    <>
      <br />
      {favorites.length > 0 && (
        <h1 style={{ textAlign: "center", color: "white" }}>favorites</h1>
      )}
      <div className={classes.layout}>
        {favorites.length === 0 && (
          <h1 style={{ paddingTop: "2rem", color: "white" }}>
            No favorites Yet
          </h1>
        )}
        {favorites.length > 0 &&
          favorites.map((city) => (
            <FavCard
              key={city.cityKey}
              cityInfo={city}
              onRemove={removeFromFav}
            />
          ))}
      </div>
    </>
  );
};
export default FavoritesTable;
