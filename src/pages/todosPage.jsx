import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TodoService from '../service/TodoService';
import TodoForm from '../components/TodoForm';

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true }); // Перенаправление на логин, если токен отсутствует
    } else {
      fetchTodos();
    }
  }, [token, navigate]);

  const fetchTodos = async () => {
    try {
      const response = await TodoService.getTasks(token);
      setTodos(response.data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  };

  const handleOpenDialog = (todo = null) => {
    setEditingTodo(todo);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingTodo(null);
    setOpen(false);
    fetchTodos();
  };

  const handleSaveTodo = async (newTodo) => {
    try {
      if (editingTodo) {
        await TodoService.editTask(editingTodo.id, newTodo, token);
      } else {
        await TodoService.addTask(newTodo, token);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await TodoService.deleteTask(todoId, token);
      fetchTodos();
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Задачи</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Добавить задачу
      </Button>

      {todos.length === 0 ? (
        <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '20px' }}>
          У вас нет задач. Добавьте новую задачу, чтобы начать.
        </Typography>
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} divider>
              <ListItemText primary={todo.title} secondary={`Дата выполнения: ${todo.dueDate}`} />
              <IconButton onClick={() => handleOpenDialog(todo)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                <DeleteIcon color="primary" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editingTodo ? "Редактировать задачу" : "Новая задача"}
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TodoForm
            todo={editingTodo}
            onSave={handleSaveTodo}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default TodosPage;
