import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("favorites");
  };

  const addToFavorites = (book) => {
    if (!favorites.find((fav) => fav.isbn13 === book.isbn13)) {
      const updated = [...favorites, book];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFromFavorites = (isbn13) => {
    const updated = favorites.filter((book) => book.isbn13 !== isbn13);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Ошибка парсинга savedUser:", e);
      localStorage.removeItem("user");
    }
  
    try {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites && savedFavorites !== "undefined") {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (e) {
      console.error("Ошибка парсинга savedFavorites:", e);
      localStorage.removeItem("favorites");
    }
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        favorites,
        login,
        logout,
        addToFavorites,
        removeFromFavorites,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
