import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function BooksPage({ query }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchBooks(searchQuery = "") {
    try {
      setLoading(true);
      let url = "https://api.itbook.store/1.0/new";

      if (searchQuery.trim()) {
        url = `https://api.itbook.store/1.0/search/${searchQuery}`;
      }

      const response = await fetch(url);
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

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks(query);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="books__page">
      <div className="container">
        <h3 className="spisok__title">Список книг</h3>
        <div className="books__spisok">
          {isLoading ? (
            <Loader />
          ) : books.length > 0 ? (
            books.map((book) => (
              <Link
                key={book.isbn13}
                to={`/books/${book.isbn13}`}
                className="spisok__item"
              >
                <img src={book.image} alt={book.title} />
                <h3 className="item__title">{book.title}</h3>
                <p className="item__subtitle">{book.subtitle || "Нет темы"}</p>
              </Link>
            ))
          ) : (
            <p className="book__error">Книги не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
}
