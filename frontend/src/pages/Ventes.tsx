
import { useMemo, useState } from "react";

interface Vente {
  id: number;
  date: string;
  produit: string;
  client: string;
  quantite: number;
  montant: number;
  statut: "Payée" | "En attente" | "Annulée";
}

const ventesInitiales: Vente[] = [
  { id: 1001, date: "2026-10-14", produit: "Ordinateur portable", client: "Martin Dupont", quantite: 1, montant: 899, statut: "Payée" },
  { id: 1002, date: "2026-10-13", produit: "Souris sans fil", client: "Sophie Bernard", quantite: 2, montant: 58, statut: "Payée" },
  { id: 1003, date: "2026-10-13", produit: "Écran 27 pouces", client: "Lucas Petit", quantite: 1, montant: 249, statut: "En attente" },
  { id: 1004, date: "2026-10-12", produit: "Clavier mécanique", client: "Emma Robert", quantite: 1, montant: 95, statut: "Payée" },
  { id: 1005, date: "2026-10-11", produit: "Casque audio", client: "Thomas Moreau", quantite: 1, montant: 129, statut: "Annulée" },
  { id: 1006, date: "2026-10-10", produit: "Webcam HD", client: "Léa Simon", quantite: 2, montant: 118, statut: "Payée" },
  { id: 1007, date: "2026-10-09", produit: "Disque SSD 1 To", client: "Adam Laurent", quantite: 1, montant: 89, statut: "En attente" },
];

const formatEuro = (montant: number) =>
  montant.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR");

function Ventes() {
  const [recherche, setRecherche] = useState("");
  const [statutFiltre, setStatutFiltre] = useState("Tous");

  const ventesFiltrees = useMemo(() => {
    const terme = recherche.toLowerCase().trim();

    return ventesInitiales.filter((vente) => {
      const correspondRecherche =
        vente.produit.toLowerCase().includes(terme) ||
        vente.client.toLowerCase().includes(terme) ||
        String(vente.id).includes(terme);

      const correspondStatut =
        statutFiltre === "Tous" || vente.statut === statutFiltre;

      return correspondRecherche && correspondStatut;
    });
  }, [recherche, statutFiltre]);

  const chiffreAffaires = ventesInitiales
    .filter((vente) => vente.statut === "Payée")
    .reduce((total, vente) => total + vente.montant, 0);

  const nombrePayees = ventesInitiales.filter(
    (vente) => vente.statut === "Payée"
  ).length;

  const enAttente = ventesInitiales
    .filter((vente) => vente.statut === "En attente")
    .reduce((total, vente) => total + vente.montant, 0);

  return (
    <div className="sales-page">
      <header className="sales-header">
        <div>
          <h1>Ventes</h1>
          <p>Suivez vos transactions et vos performances commerciales.</p>
        </div>

        <span className="demo-label">Données de démonstration</span>
      </header>

      <section className="sales-kpis">
        <article className="sales-kpi">
          <span>Chiffre d'affaires encaissé</span>
          <strong>{formatEuro(chiffreAffaires)}</strong>
          <small>Ventes payées uniquement</small>
        </article>

        <article className="sales-kpi">
          <span>Ventes payées</span>
          <strong>{nombrePayees}</strong>
          <small>Transactions confirmées</small>
        </article>

        <article className="sales-kpi">
          <span>En attente</span>
          <strong>{formatEuro(enAttente)}</strong>
          <small>Montant restant à encaisser</small>
        </article>
      </section>

      <section className="sales-table-card">
        <div className="sales-table-header">
          <div>
            <h2>Liste des transactions</h2>
            <p>{ventesFiltrees.length} résultat(s)</p>
          </div>

          <div className="sales-filters">
            <input
              type="search"
              placeholder="Rechercher un client, produit, ID..."
              value={recherche}
              onChange={(event) => setRecherche(event.target.value)}
              aria-label="Rechercher une vente"
            />

            <select
              value={statutFiltre}
              onChange={(event) => setStatutFiltre(event.target.value)}
              aria-label="Filtrer par statut"
            >
              <option value="Tous">Tous les statuts</option>
              <option value="Payée">Payées</option>
              <option value="En attente">En attente</option>
              <option value="Annulée">Annulées</option>
            </select>
          </div>
        </div>

        <div className="sales-table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Référence</th>
                <th>Date</th>
                <th>Produit</th>
                <th>Client</th>
                <th>Qté</th>
                <th>Montant</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {ventesFiltrees.map((vente) => (
                <tr key={vente.id}>
                  <td>#{vente.id}</td>
                  <td>{formatDate(vente.date)}</td>
                  <td>{vente.produit}</td>
                  <td>{vente.client}</td>
                  <td>{vente.quantite}</td>
                  <td className="sales-amount">{formatEuro(vente.montant)}</td>
                  <td>
                    <span
                      className={`sale-status ${vente.statut
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {vente.statut}
                    </span>
                  </td>
                </tr>
              ))}

              {ventesFiltrees.length === 0 && (
                <tr>
                  <td colSpan={7} className="sales-empty">
                    Aucune vente ne correspond à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Ventes;
