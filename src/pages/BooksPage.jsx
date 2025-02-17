import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.itbook.store/1.0/new"
        );
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data.books.slice(0, 20));
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, []);

  return (
    <div className="books__page">
      <div className="container">
        <h3 className="spisok__title">Список книг</h3>
        <div className="books__spisok">
          {isLoading ? (
            <Loader />
          ) : (
            books.map((book) => (
              <Link to = {`/books/${book.isbn13}`} className="spisok__item">
                <img src={book.image} alt={book.title} />
                <h3 className="item__title">{book.title}</h3>
                <p classNamde="item__subtitle">{book.subtitle || "Нет темы"}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
