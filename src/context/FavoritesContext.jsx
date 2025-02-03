import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (dogId) => {
    setFavorites((prev) => [...prev, dogId]);
  };

  const removeFavorite = (dogId) => {
    setFavorites((prev) => prev.filter((id) => id !== dogId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (dogId) => {
    return favorites.includes(dogId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
