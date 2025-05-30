import { useEffect, useState } from "react";
import api from "../services/api";
import "./Inventory.css";

interface Aliment {
  id: number;
  nom: string;
  dateExpiration: string;
  quantite: number;
  categorie: string;
}

const Inventory = () => {
  const [inventory, setInventory] = useState<Aliment[]>([]);
  const [nom, setNom] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  const [quantite, setQuantite] = useState<number>(1);
  const [categorie, setCategorie] = useState("default");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAliments = async () => {
    try {
      const res = await api.get<Aliment[]>("/inventaire");
      setInventory(res.data);
    } catch (err) {
      console.error("Erreur lors du GET :", err);
    }
  };

  useEffect(() => {
    fetchAliments();
  }, []);

  const handleSubmit = async () => {
    if (!nom.trim() || !dateExpiration.trim() || quantite < 1 || categorie === "default") {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      if (editingId !== null) {
        const res = await api.put<Aliment>(`/inventaire/${editingId}`, {
          nom,
          dateExpiration,
          quantite,
          categorie,
        });
        setInventory((prev) =>
          prev.map((item) => (item.id === editingId ? res.data : item))
        );
        setEditingId(null);
        setIsModalOpen(false);
      } else {
        const res = await api.post<Aliment>("/inventaire", {
          nom,
          dateExpiration,
          quantite,
          categorie,
        });
        setInventory([...inventory, res.data]);
      }

      setNom("");
      setDateExpiration("");
      setQuantite(1);
      setCategorie("default");
    } catch (err) {
      console.error("Erreur lors de la requête :", err);
    }
  };

  const editInventoryItem = (item: Aliment) => {
    setEditingId(item.id);
    setNom(item.nom);
    setDateExpiration(item.dateExpiration);
    setQuantite(item.quantite);
    setCategorie(item.categorie);
    setIsModalOpen(true);
  };

  const removeInventoryItem = async (id: number) => {
    try {
      await api.delete(`/inventaire/${id}`);
      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erreur lors du DELETE :", err);
    }
  };

  return (
    <div className="inventory-container">
      <h2>
        🧊 Gère ton frigo comme un pro : ajoute tes aliments, suis leur date
        d’expiration, et évite le gaspillage en un clin d’œil ! 🛒✨
      </h2>

      <p style={{ fontStyle: "italic", color: "#333", marginBottom: "1rem" }}>
        Gardez une trace de vos aliments, évitez le gaspillage, et organisez vos
        courses intelligemment 🛒✨
      </p>

      <p>Remplis les champs ci-dessous pour ajouter un nouvel aliment :</p>

      <div className="add-item">
        <input
          type="text"
          placeholder="Nom de l'aliment (ex : Tomate)"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Entrez la date d'expiration"
          onFocus={(e) => (e.currentTarget.type = "date")}
          value={dateExpiration}
          onChange={(e) => setDateExpiration(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantité (ex : 2)"
          min={1}
          value={quantite}
          onChange={(e) => setQuantite(parseInt(e.target.value) || 1)}
        />
        <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          <option value="default" disabled>Sélectionner une catégorie</option>
          <option value="Produits laitiers">Produits laitiers</option>
          <option value="Viande">Viande</option>
          <option value="Fruits">Fruits</option>
          <option value="Légumes">Légumes</option>
          <option value="Épicerie">Épicerie</option>
          <option value="Autre">Autre</option>
        </select>
        <button onClick={handleSubmit}>
          {editingId !== null ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Date d’expiration</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.nom}</td>
              <td>{item.quantite}</td>
              <td>{item.dateExpiration}</td>
              <td>{item.categorie}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => editInventoryItem(item)}
                >
                  Modifier
                </button>
                <button
                  className="delete-button"
                  onClick={() => removeInventoryItem(item.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Modifier l’aliment</h3>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom"
            />
            <input
              type="date"
              value={dateExpiration}
              onChange={(e) => setDateExpiration(e.target.value)}
            />
            <input
              type="number"
              value={quantite}
              min={1}
              onChange={(e) => setQuantite(parseInt(e.target.value))}
            />
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option value="default" disabled>Sélectionner une catégorie</option>
              <option value="Produits laitiers">Produits laitiers</option>
              <option value="Viande">Viande</option>
              <option value="Fruits">Fruits</option>
              <option value="Légumes">Légumes</option>
              <option value="Épicerie">Épicerie</option>
              <option value="Autre">Autre</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleSubmit}>Enregistrer</button>
              <button onClick={() => setIsModalOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
