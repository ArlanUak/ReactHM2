import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setUser(storedUser);
    setFavorites(storedFavorites);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
    localStorage.removeItem("favorites");
  };

  const addToFavorites = (book) => {
    if (!favorites.find((fav) => fav.isbn13 === book.isbn13)) {
      const updatedFavorites = [...favorites, book];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (isbn13) => {
    const updatedFavorites = favorites.filter((book) => book.isbn13 !== isbn13);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </AuthContext.Provider>
  );  
};

export const useAuth = () => {
  return useContext(AuthContext);
};
