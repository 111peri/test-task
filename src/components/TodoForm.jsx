import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function TodoForm({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [dueDate, setDueDate] = useState(todo?.dueDate || '');

  const handleSave = () => {
    const newTodo = {
      title,
      description,
      dueDate,
    };
    onSave(newTodo);
  };

  return (
    <div>
      <TextField
        label="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Дата выполнения"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={handleSave} variant="contained" color="primary">
        Сохранить
      </Button>
      <Button onClick={onCancel} style={{ marginLeft: '10px' }}>
        Отмена
      </Button>
    </div>
  );
}

export default TodoForm;
