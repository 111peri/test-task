import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccessMessage(''); 

    try {
      const token = await AuthService.login(username, password);
      console.log('Полученный токен:', token); 
      if (token) {
        setSuccessMessage("Вход выполнен успешно!");
        localStorage.setItem('token', token); 
        navigate('/tasks'); 
      }
    } catch (error) {
      if (error?.response?.data) {
        setError(error.response.data);
      } else {
        console.error("Ошибка при входе. Попробуйте снова.");
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Вход
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
          {successMessage && (
            <Typography variant="subtitle2" color="primary" gutterBottom>
              {successMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
