import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import TodoService from '../service/TodoService';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, dueDate };
    
    try {
      await TodoService.addTask(task);
      navigate('/tasks'); // Перенаправляем на /tasks после добавления задачи
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Создать задачу
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Название"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Описание"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Дата выполнения"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            style={{ marginTop: '20px' }}
          >
            Сохранить
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default TaskForm;
