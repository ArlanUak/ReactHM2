import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import RegistrationModal from "../components/RegistrationModal";

const UserProfile = () => {
  const { user, logout, favorites, removeFromFavorites } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <div className="user-profile">
          <div className="profile__top">
            <h2>Привет, {user.name}!</h2>
            <button onClick={handleLogout} className="logout__btn">Выйти</button>
          </div>
          <div className="books">
            <h3>Ваши избранные книги:</h3>
            {favorites.length > 0 ? (
              <div className="books__spisok" style={{ gap: "30px" }}>
                {favorites.map((book) => (
                  <div key={book.isbn13} className="spisok__item">
                    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "10px" }}>
                      <Link
                        to={`/books/${book.isbn13}`}
                        style={{ flexGrow: 1 }}
                      >
                        <img src={book.image} alt={book.title} />
                        <h4 className="item__title">{book.title}</h4>
                        <p className="item__subtitle">{book.subtitle || "Нет темы"}</p>
                      </Link>
                      <button
                        className="remove-button"
                        onClick={() => removeFromFavorites(book.isbn13)}
                        style={{
                          marginTop: "auto",
                          backgroundColor: "red",
                          border: "none",
                          padding: "5px 10px",
                          color: "#fff",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
