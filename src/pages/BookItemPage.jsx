import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

export default function BookItemPage() {
  const { isbn13 } = useParams();
  const [book, setBook] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Ошибка:", error))
      .finally(() => setLoading(false));
  }, [isbn13]);

  if (isLoading) return <Loader />;
  if (!book) return <p>Книга не найдена</p>;

  return (
    <div className="book__details">
      <div className = "book__main-info">
        <h2>{book.title}</h2>
        <h3>{book.subtitle || "Нет подзаголовка"}</h3>
        <img src={book.image} alt={book.title} />
        <p>
          <strong>Цена:</strong> {book.price}
        </p>
        <Link to={book.url} target="_blank" rel="noopener noreferrer"  className="buy-button">
          Купить
        </Link>
       
      </div>
      <div className="book__info">
        <p>
          <strong>Автор:</strong> {book.authors}
        </p>
        <p>
          <strong>Издатель:</strong> {book.publisher}
        </p>
        <p>
          <strong>Страниц:</strong> {book.pages}
        </p>
        <p>
          <strong>Год:</strong> {book.year}
        </p>
        <p>
          <strong>Рейтинг:</strong> {book.rating}/5
        </p>
        <p>
          <strong>Описание:</strong> {book.desc}
        </p>
      </div>
    </div>
  );
}
