import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const LoginModal = ({ onClose }) => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Вход:", data);
    login(data);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: "Введите логин" })}
            placeholder="Логин"
          />
          {errors.username && <p className="error">{errors.username.message}</p>}

          <input
            type="password"
            {...register("password", {
              required: "Введите пароль",
              minLength: { value: 6, message: "Минимум 6 символов" }
            })}
            placeholder="Пароль"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button type="submit">Войти</button>
        </form>
        <button className="close-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default LoginModal;
