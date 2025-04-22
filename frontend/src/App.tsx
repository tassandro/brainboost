//npm install --save-dev react-app-rewired
//npm install --save-dev @craco/craco


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import '@/pages/Home/Home.css';

import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Questions from '@/pages/Questions/Questions';
import Profile from '@/pages/Profile/EditProfile';
import Plans from '@/pages/Plans/Plans';
import { PrivateRoute } from '@/routes/PrivateRoute';
import { AuthProvider } from '@/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h screen overflow-x-hidden font-sans">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plans" element={<Plans />} />

            {/* Rotas protegidas */}
            <Route path="/questions" element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            } />

            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />

            {/* Rota fallback: redireciona qualquer rota inválida para a home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
