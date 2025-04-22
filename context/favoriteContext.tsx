import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavoriteItem = {
  title: string;
  path: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (path: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'favorite_prayers';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) setFavorites(JSON.parse(data));
    });
  }, []);

  const saveFavorites = async (items: FavoriteItem[]) => {
    setFavorites(items);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const toggleFavorite = (item: FavoriteItem) => {
    const exists = favorites.some((fav) => fav.path === item.path);
    const updated = exists
      ? favorites.filter((fav) => fav.path !== item.path)
      : [...favorites, item];
    saveFavorites(updated);
  };

  const isFavorite = (path: string) => {
    return favorites.some((fav) => fav.path === path);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
