import { useEffect, useState } from "react";
import api from "../services/api";
import { getRecipesByIngredients } from "../services/spoonacular";
import "./Suggestions.css";

interface Aliment {
  id: number;
  nom: string;
  categorie: string;
}

interface Recette {
  id: number;
  title: string;
  image: string;
  usedIngredients: { name: string }[];
  missedIngredients: { name: string }[];
}

const platsEquilibre = [
  "Poulet rôti aux légumes",
  "Salade quinoa et avocat",
  "Saumon grillé et riz complet",
  "Omelette aux épinards",
  "Soupe de légumes maison"
];

const platsPerte = [
  "Soupe de courgette légère",
  "Salade verte et poulet grillé",
  "Filet de poisson vapeur",
  "Smoothie vert detox",
  "Poêlée de légumes"
];

const platsPrise = [
  "Pâtes à la carbonara",
  "Burger maison complet",
  "Curry de poulet avec riz",
  "Gratin dauphinois",
  "Steak avec pommes de terre sautées"
];

const conseilsEquilibre = [
  "🥦 Variez vos repas avec des aliments frais.",
  "💧 Buvez au moins 1,5L d’eau par jour.",
  "🍽️ Mangez lentement pour mieux ressentir la satiété."
];

const conseilsPerte = [
  "🚫 Limitez les sucres rapides (sodas, pâtisseries).",
  "🥗 Favorisez les légumes et protéines maigres.",
  "🚶‍♀️ Marchez 30 min par jour."
];

const conseilsPrise = [
  "🍝 Mangez plus souvent avec des repas riches.",
  "🥑 Privilégiez les bons lipides (avocats, noix...).",
  "🏋️‍♂️ Faites de la musculation pour prendre du muscle."
];

const Suggestions = () => {
  const [inventaire, setInventaire] = useState<Aliment[]>([]);
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [conseils, setConseils] = useState<string[]>(conseilsEquilibre);
  const [categorie, setCategorie] = useState<"equilibre" | "perte" | "prise">("equilibre");
  const [platsSuggeres, setPlatsSuggeres] = useState<string[]>(platsEquilibre);

  // Récupération inventaire
  const fetchInventaire = async () => {
    try {
      const res = await api.get<Aliment[]>("/inventaire");
      setInventaire(res.data);
    } catch {
      setError("❌ Erreur lors du chargement de l'inventaire.");
    }
  };

  // Récupération recettes en fonction inventaire
  const fetchRecettes = async () => {
    try {
      const ingredients = inventaire.map((a) => a.nom);
      const recettesApi = await getRecipesByIngredients(ingredients);
      setRecettes(recettesApi as Recette[]);
    } catch {
      setError("❌ Erreur lors de la récupération des recettes.");
    }
  };

  // Mise à jour conseils et plats selon catégorie
  useEffect(() => {
    switch (categorie) {
      case "perte":
        setConseils(conseilsPerte);
        setPlatsSuggeres(platsPerte);
        break;
      case "prise":
        setConseils(conseilsPrise);
        setPlatsSuggeres(platsPrise);
        break;
      default:
        setConseils(conseilsEquilibre);
        setPlatsSuggeres(platsEquilibre);
    }
  }, [categorie]);

  // Initialisation inventaire + recettes
  useEffect(() => {
    fetchInventaire();
  }, []);

  useEffect(() => {
    if (inventaire.length > 0) fetchRecettes();
  }, [inventaire]);

  return (
    <div className="suggestions-container" style={{ paddingTop: "70px" }}>
      <h2>🍽️ Suggestions de Plats</h2>
      <p className="suggestions-intro">
        Découvrez ce que vous pouvez cuisiner avec ce que vous avez dans votre frigo. Choisissez un objectif nutritionnel ci-dessous.
      </p>

      <div className="category-filters">
        <button
          className={categorie === "equilibre" ? "active" : ""}
          onClick={() => setCategorie("equilibre")}
        >
          Équilibré
        </button>
        <button
          className={categorie === "perte" ? "active" : ""}
          onClick={() => setCategorie("perte")}
        >
          Perte de poids
        </button>
        <button
          className={categorie === "prise" ? "active" : ""}
          onClick={() => setCategorie("prise")}
        >
          Prise de masse
        </button>
      </div>

      <h3>📝 Conseils nutritionnels</h3>
      <ul>
        {conseils.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>

      {error && <p className="error">{error}</p>}

      <h3>🍲 Plats suggérés pour le régime {categorie} :</h3>
      <ul>
        {platsSuggeres.map((plat, i) => (
          <li key={i}>{plat}</li>
        ))}
      </ul>

      <h3>🧊 Recettes basées sur votre inventaire :</h3>
      <div className="recettes-grid">
        {recettes.map((recette) => (
          <div key={recette.id} className="recette-card">
            <img src={recette.image} alt={recette.title} />
            <h3>{recette.title}</h3>
            <p>✅ Ingrédients disponibles :</p>
            <ul>
              {recette.usedIngredients.map((ing, idx) => (
                <li key={idx}>{ing.name}</li>
              ))}
            </ul>
            {recette.missedIngredients.length > 0 && (
              <>
                <p>❌ Ingrédients manquants :</p>
                <ul className="manquants">
                  {recette.missedIngredients.map((ing, idx) => (
                    <li key={idx}>{ing.name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
