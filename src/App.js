import logo from "./logo.svg";
import "./style/styles.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutUs from "./pages/AboutUs";
import BooksPage from "./pages/BooksPage";
import NotFound from "./pages/NotFound";
import BookItemPage from "./pages/BookItemPage";
import { AuthProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  return (
    <>
      <AuthProvider>
        <Header onSearch={setQuery} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <MainPage />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="container">
                <AboutUs />
              </div>
            }
          />
          <Route
            path="/books"
            element={
              <div className="container">
                <BooksPage query={query} />
              </div>
            }
          />

          <Route
            path="/books/:isbn13"
            element={
              <div className="container">
                <BookItemPage />
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="container">
                <NotFound />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="container">
                <UserProfile />
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
