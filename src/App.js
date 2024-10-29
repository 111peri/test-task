import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TasksPage from './components/TasksPage';
import TaskForm from './components/TaskForm';
import Registration from './pages/registration';
import Login from './pages/login';
import ProtectedRoute from './routes/ProtectedRoute'; // Импортируем защищенный маршрут

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* Перенаправление на логин по умолчанию */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        
        {/* Защищенные маршруты */}
        <Route 
          path="/tasks" 
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-task" 
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-task/:id" 
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
