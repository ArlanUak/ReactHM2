import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import RegistrationModal from "../components/RegistrationModal";

const UserProfile = () => {
  const { user, logout, favorites } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    if (favorites.length > 0) {
      Promise.all(
        favorites.map((isbn13) =>
          fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
            .then((res) => res.json())
        )
      )
        .then((books) => setFavoriteBooks(books))
        .catch((error) => console.error("Ошибка загрузки книг:", error));
    } else {
      setFavoriteBooks([]); 
    }
  }, [favorites]);

  return (
    <div>
      {user ? (
        <div className="user-profile">
          <div>
          <h2>Привет, {user.username}!</h2>
          <button onClick={logout}>Выйти</button>
          </div>
          <div>
          <h3>Ваши избранные книги:</h3>
          {favoriteBooks.length > 0 ? (
            <ul>
              {favoriteBooks.map((book) => (
                <li key={book.isbn13}>
                  <Link to={`/books/${book.isbn13}`}>
                    <img src={book.image} alt={book.title} width="50" />
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>Вы пока не добавили книги в избранное</p>
          )}
          </div>
        </div>
      ) : (
        isModalOpen && <RegistrationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default UserProfile;
