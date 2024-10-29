import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TodoService from '../service/TodoService';
import TodoForm from './TodoForm';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const dialogContentRef = useRef(null); // Реф для содержимого диалога

  useEffect(() => {
    if (!token) {
      console.warn("Токен не найден. Перенаправление на страницу логина.");
      navigate('/login', { replace: true });
    } else {
      fetchTasks();
    }
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await TodoService.getTasks(token);
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  };

  useEffect(() => {
    if (open && dialogContentRef.current) {
      // Перемещаем фокус на первый фокусируемый элемент внутри диалога
      const firstFocusable = dialogContentRef.current.querySelector('button');
      firstFocusable && firstFocusable.focus();
    }
  }, [open]);

  const handleOpenDialog = (task = null) => {
    setEditingTask(task);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditingTask(null);
    setOpen(false);
    fetchTasks();
  };

  const handleSaveTask = async (taskData) => {
    if (!token) {
      console.warn("Токен отсутствует, операция не выполнена.");
      return;
    }

    try {
      const taskToSave = {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString().split("T")[0] : null,
      };

      if (editingTask) {
        await TodoService.editTask(editingTask.id, taskToSave, token);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTask.id ? { ...task, ...taskToSave } : task
          )
        );
      } else {
        const response = await TodoService.addTask(taskToSave, token);
        setTasks((prevTasks) => [...prevTasks, response.data]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!token) {
      console.warn("Токен отсутствует, операция не выполнена.");
      return;
    }

    try {
      await TodoService.deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Список задач</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Добавить задачу
      </Button>

      {tasks.length === 0 ? (
        <Typography variant="subtitle1" color="textSecondary" style={{ marginTop: '20px' }}>
          У вас нет задач. Добавьте новую задачу, чтобы начать.
        </Typography>
      ) : (
        <List>
          {tasks.map((task, index) => (
            <ListItem key={`${task.id}-${index}`} divider>
              <ListItemText
                primary={`${index + 1}. ${task.title}`} 
                secondary={`Дата выполнения: ${task.dueDate}`}
              />
              <IconButton onClick={() => handleOpenDialog(task)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon color="primary" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editingTask ? "Редактировать задачу" : "Новая задача"}
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent ref={dialogContentRef}>
          <TodoForm
            task={editingTask}
            onSave={handleSaveTask}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default TasksPage;
