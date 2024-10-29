import axios from 'axios';

const API_URL = 'http://api.calmplete.net/api';

const TodoService = {
  // Получение списка задач
  getTasks: () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/Todos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Добавление новой задачи
  addTask: (task) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/Todos`, task, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  
  editTask: (id, task) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/Todos/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Пометка задачи как завершенной
  markTaskCompleted: (id) => {
    const token = localStorage.getItem('token');
    return axios.patch(`${API_URL}/Todos/${id}/complete`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Удаление задачи
  deleteTask: (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/Todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default TodoService;
