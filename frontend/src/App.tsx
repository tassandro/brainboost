//npm install --save-dev react-app-rewired
//npm install --save-dev @craco/craco


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import '@/pages/Home/Home.css';

import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import Questions from '@/pages/Questions/Questions';
import Profile from '@/pages/Profile/Profile';
import Plans from '@/pages/Plans/Plans';
import EditProfile from '@/pages/Profile/EditProfile';
import { PrivateRoute } from '@/routes/PrivateRoute';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h screen overflow-x-hidden font-sans">
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Navigate to='/home' replace/>}/>
              <Route path="/home" element={<Home />} />
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

              <Route path="/edit" element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              } />

              {/* Rota fallback: redireciona qualquer rota inválida para a home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
