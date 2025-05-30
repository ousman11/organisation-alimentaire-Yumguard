import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Inventory from './components/Inventory';
import ShoppingList from './components/ShoppingList';
import Suggestions from './components/Suggestions';
import Navbar from './components/Navbar';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  // Masquer la navbar uniquement sur la page de connexion
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Redirection de base vers /home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Page d'accueil */}
        <Route path="/home" element={<Home />} />

        {/* Page de connexion (publique) */}
        <Route path="/login" element={<Login />} />

        {/* Inventaire (protégé) */}
        <Route
          path="/inventaire"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        {/* Liste des courses (protégée) */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <ShoppingList />
            </ProtectedRoute>
          }
        />

        {/* Suggestions de repas (protégée) */}
        <Route
          path="/suggestions"
          element={
            <ProtectedRoute>
              <Suggestions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
