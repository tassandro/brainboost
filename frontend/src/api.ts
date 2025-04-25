import axios from 'axios';

//api.ts
// Faz com que o token seja enviado em todas as requisições
// Criação de instância do axios com baseURL
const API = axios.create({
  baseURL: 'http://localhost:8000',
});

// Adiciona o token a cada requisição, se existir
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  console.log('[API REQUEST]', config.method?.toUpperCase(), config.baseURL + config.url);
  console.log('[HEADERS]', config.headers);

  return config;
});

export default API;
