import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isString = value => typeof value === 'string';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Сброс ошибки перед новой попыткой регистрации

    try {
      await AuthService.signUp(username, password);
      console.log("Регистрация успешна");
      navigate('/login'); // Перенаправление на страницу логина
    } catch (error) {
      if (error?.response?.data) {
        if (isString(error.response.data)) {
          setError(error.response.data);
        } else {
          setError("Произошла ошибка при регистрации. Попробуйте еще раз.");
        }
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="E-mail"
            error={!!error}
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            fullWidth
            error={!!error}
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Подтвердить
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Registration;
