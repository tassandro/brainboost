// https://vectorizer.com/pt/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/Home.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Questions from './pages/Questions';
import { PrivateRoute } from './pages/Context/PrivateRoute';
import { AuthProvider } from './pages/Context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/questions" element={<PrivateRoute><Questions /></PrivateRoute>}/>
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App;
