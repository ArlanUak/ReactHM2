import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function BookItemPage() {
  const { isbn13 } = useParams();
  const [book, setBook] = useState();
  const [isLoading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const { user, login, logout } = useAuth(); // Получаем данные из контекста

  useEffect(() => {
    fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((error) => console.error("Ошибка:", error))
      .finally(() => setLoading(false));
  }, [isbn13]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${isbn13}`)) || [];
    setReviews(storedReviews);
  
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites); // ✅ Загружаем избранное
  }, [isbn13]);
  

  const handleReviewSubmit = () => {
    if (!user) {
      alert("Только авторизованные пользователи могут оставлять отзывы!");
      return;
    }

    if (!newReview.trim()) return;

    const newReviews = [...reviews, { username: user.username, rating, text: newReview }];
    setReviews(newReviews);
    localStorage.setItem(`reviews_${isbn13}`, JSON.stringify(newReviews));

    setNewReview("");
    setRating(5);
  };

  const toggleFavorite = () => {
    if (!user) {
      alert("Только авторизованные пользователи могут добавлять книги в избранное!");
      return;
    }
  
    let storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  
    let updatedFavorites;
    if (storedFavorites.includes(isbn13)) {
      updatedFavorites = storedFavorites.filter(id => id !== isbn13);
    } else {
      updatedFavorites = [...storedFavorites, isbn13]; 
    }
  
    setFavorites(updatedFavorites); // ✅ Обновляем состояние
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  
  

  if (isLoading) return <Loader />;
  if (!book) return <p>Книга не найдена</p>;

  return (
    <div className="book__details">
      <div className="book_main">
      <div className="book__main-info">
        <h2>{book.title}</h2>
        <img src={book.image} alt={book.title} />
        <p><strong>Цена:</strong> {book.price}</p>
        <Link to={book.url} target="_blank" rel="noopener noreferrer" className="buy-button">
          Купить
        </Link>
        <button onClick={toggleFavorite} className="favorite-button">
          {favorites.includes(isbn13) ? "Удалить из избранного" : "Добавить в избранное"}
        </button>
      </div>
      <div className="book__info">
        <p><strong>Автор:</strong> {book.authors}</p>
        <p><strong>Издатель:</strong> {book.publisher}</p>
        <p><strong>Страниц:</strong> {book.pages}</p>
        <p><strong>Год:</strong> {book.year}</p>
        <p><strong>Рейтинг:</strong> {book.rating}/5</p>
        <p><strong>Описание:</strong> {book.desc}</p>
      </div>
      </div>
      {/* Отзывы */}
      <div className="reviews-section">
        <h3>Отзывы</h3>
        <div className="reviews-container">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p><strong>{review.username}</strong> ({review.rating}/5)</p>
                <p>{review.text}</p>
              </div>
            ))
          ) : (
            <p>Отзывов пока нет</p>
          )}
        </div>
        {user ? (
          <div className="review-form">
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Оставьте отзыв..."
            />
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <button onClick={handleReviewSubmit}>
              Отправить
            </button>
          </div>
        ) : (
          <p style={{ color: "red", fontWeight: "bold" }}>
            Войдите в аккаунт, чтобы оставить отзыв!
          </p>
        )}
      </div>
    </div>
  );
}
