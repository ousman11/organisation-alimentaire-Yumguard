import { useEffect, useState } from "react";
import api from "../services/api";
import "./ShoppingList.css";

interface Aliment {
  id: number;
  nom: string;
  categorie: string;
  ajoute?: boolean;
}

// Liste des catégories proposées pour le filtrage
const categories = [
  "Tous",
  "Produits laitiers",
  "Viande",
  "Fruits",
  "Légumes",
  "Épicerie",
  "Autre"
];

const ShoppingList = () => {
  const [items, setItems] = useState<Aliment[]>([]);
  const [filter, setFilter] = useState<string>("Tous");

  // Appel à l'API pour récupérer les aliments disponibles
  const fetchItems = async () => {
    try {
      const res = await api.get<Aliment[]>("/inventaire");
      setItems(res.data);
    } catch (err) {
      console.error("Erreur GET inventaire :", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filtrage dynamique selon la catégorie sélectionnée
  const filteredItems =
    filter === "Tous"
      ? items
      : items.filter((item) => item.categorie === filter);

  return (
    <div className="shopping-container">
      <h2>🛒 Liste des Courses</h2>

      <p className="intro-text">
        Bienvenue sur votre assistant de courses personnalisé !<br />
        📦 Cette page regroupe tous les produits que vous avez ajoutés à votre
        liste d’achats.
        <br />
        🗂️ Vous pouvez facilement filtrer par catégorie(Fruits, Viande,
        Épicerie, etc.) pour organiser vos achats.
        <br />
        Objectif : éviter les doublons, optimiser vos courses et gagner du
        temps !
      </p>

      {/* Filtres de catégories */}
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tableau des aliments filtrés */}
      {filteredItems.length > 0 ? (
        <table className="shopping-table">
          <thead>
            <tr>
              <th>Nom du produit</th>
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.nom}</td>
                <td>{item.categorie}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results">Aucun produit trouvé dans cette catégorie.</p>
      )}
    </div>
  );
};

export default ShoppingList;
