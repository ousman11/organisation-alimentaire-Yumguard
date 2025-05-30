import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";
import { useAuth } from "../context/AuthContext";

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
  };
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });

      localStorage.setItem("token", res.data.access_token);
      setIsAuthenticated(true); // ✅ mise à jour immédiate du contexte
      navigate("/home");
    } catch (err) {
      console.error("Erreur de connexion :", err);
      alert("Email ou mot de passe invalide.");
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Afficher le mot de passe
        </label>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
