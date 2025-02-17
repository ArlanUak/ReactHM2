import ItBooks from "../image/image.png";
import Loader from "../components/Loader";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.itbook.store/1.0/search/react"
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.books.slice(0, 3));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, []);

  return (
    <>
      <main>
        <section className="hero">
          <div className="container">
            <h1 className="main_title">
              Добро пожаловать в библиотеку IT-книг
            </h1>
            <p className="main_subtitle">
              Здесь вы найдете лучшие книги по программированию, разработке и
              технологиям.
            </p>
          </div>
          <img src={ItBooks} alt="Book" className="main_book" />
        </section>
      </main>

      <section className="slider" id="authors">
        <div className="container">
          <div className="slider__container">
            <h1 className="slider__header">Популярные книги по REACT</h1>
            <div class="slider__track">
              {isLoading ? (
                <Loader />
              ) : (
                books.map((book) => (
                  <div className="slide">
                    <img src={book.image} alt="Author 1" />
                    <h3> {book.title} </h3>
                    <p> {book.subtitle || "Нет темы"} </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
