import apiService from './ApiService';

const AuthService = {
  // Метод для регистрации
  signUp: async (email, password) => {
    try {
      const response = await apiService.post(`/InternalLogin/sign-up`, { email, password });
      console.log("Регистрация прошла успешно");
      return response;
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      throw error;
    }
  },

  // Метод для входа
  login: async (username, password) => {
    try {
      const response = await apiService.post(`/InternalLogin`, { 
        username, 
        password, 
        state: 'Internal' 
      });
      console.log("Ответ сервера:", response.data); // Лог ответа сервера для отладки

      // Извлекаем токен из accessToken
      const token = response.data?.accessToken;
      if (token) {
        localStorage.setItem('token', token); // Сохраняем токен в localStorage
        console.log("Вход выполнен успешно, токен сохранен");
        return token;
      } else {
        throw new Error("Токен не найден в ответе сервера");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error;
    }
  },

  // Метод для выхода
  logout: () => {
    localStorage.removeItem('token'); // Удаляем токен из localStorage
    console.log("Выход выполнен успешно, токен удален");
  },
};

export default AuthService;
