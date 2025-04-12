import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const RegistrationModal = ({ onClose }) => {
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Регистрация:", data);
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: "Введите имя пользователя" })}
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
        <button className="close-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default RegistrationModal;
