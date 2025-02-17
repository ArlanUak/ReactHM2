import logo from "./logo.svg";
import "./style/styles.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AboutUs from "./pages/AboutUs";
import BooksPage from "./pages/BooksPage";
import NotFound from "./pages/NotFound";
import BookItemPage from "./pages/BookItemPage";

function App() {
  return (
    <>
      <Header />
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
              <BooksPage />
            </div>
          }
        />
        <Route
        path="/books/:isbn13"
        element={
            <BookItemPage/>
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
      </Routes>
    </>
  );
}

export default App;
