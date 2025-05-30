import axios from "axios";

interface Ingredient {
  name: string;
}

export interface Recette {
  id: number;
  title: string;
  image: string;
  missedIngredients?: Ingredient[];
}

const spoonacular = axios.create({
  baseURL: "https://api.spoonacular.com",
  params: {
    apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
  },
});

export const getRecipesByIngredients = async (
  ingredients: string[]
): Promise<Recette[]> => {
  try {
    const response = await spoonacular.get("/recipes/findByIngredients", {
      params: {
        ingredients: ingredients.join(","),
        number: 6,
      },
    });

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn("Réponse inattendue de Spoonacular :", response.data);
      return [];
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des recettes :", err);
    return [];
  }
};
