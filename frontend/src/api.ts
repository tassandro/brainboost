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

  console.log('🔵 [API REQUEST]');
  console.log('🔹 METHOD:', config.method?.toUpperCase());
  console.log('🔹 URL:', config.baseURL + config.url);
  console.log('🔹 HEADERS:', config.headers);
  console.log('🔹 BODY:', config.data);

  return config;
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response && error.response.status === 401) {
      console.warn('🔴 [API RESPONSE] Unauthorized - deslogando...');

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)

export default API;
