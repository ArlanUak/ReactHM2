import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const RegistrationModal = ({ onClose }) => {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("https://backendbookproject.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Ответ сервера:", data);
      console.log("Код ответа:", res.status);
      
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user || formData)); // если backend возвращает `user`, лучше его сохранить
        setUser(data.user || formData);
        setMessage("Регистрация прошла успешно!");
        onClose();
      } else {
        setMessage(data.message || "Ошибка при регистрации");
      }
    } catch (err) {
      setMessage("Ошибка подключения к серверу");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", { required: "Введите имя пользователя" })}
            placeholder="Имя пользователя"
          />
          {errors.username && <p className="error">{errors.username.message}</p>}

          <input
            type="email"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Неверный формат email"
              }
            })}
            placeholder="Email"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" }
            })}
            placeholder="Пароль"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit">Зарегистрироваться</button>
        </form>
        {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
        <button className="close-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RegistrationModal;
