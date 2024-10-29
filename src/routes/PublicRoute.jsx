import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const token = localStorage.getItem('token'); // Проверка токена

  if (token) {
    return <Navigate to="/todos" replace />; // Перенаправление на /todos, если токен есть
  }

  return children; // Если токена нет, отображаем страницу (например, логин)
}

export default PublicRoute;
