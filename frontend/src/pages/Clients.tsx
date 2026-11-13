
import { useMemo, useState } from "react";

interface Client {
  id: number;
  nom: string;
  email: string;
  ville: string;
  dateInscription: string;
  commandes: number;
  chiffreAffaires: number;
}

const clientsDemo: Client[] = [
  { id: 1, nom: "Emma Martin", email: "emma.martin@email.com", ville: "Lille", dateInscription: "2026-10-02", commandes: 8, chiffreAffaires: 1240 },
  { id: 2, nom: "Lucas Bernard", email: "lucas.bernard@email.com", ville: "Paris", dateInscription: "2026-09-15", commandes: 5, chiffreAffaires: 780 },
  { id: 3, nom: "Chloé Petit", email: "chloe.petit@email.com", ville: "Lyon", dateInscription: "2026-10-20", commandes: 2, chiffreAffaires: 215 },
  { id: 4, nom: "Hugo Robert", email: "hugo.robert@email.com", ville: "Lille", dateInscription: "2026-08-10", commandes: 12, chiffreAffaires: 2180 },
  { id: 5, nom: "Inès Richard", email: "ines.richard@email.com", ville: "Marseille", dateInscription: "2026-10-25", commandes: 1, chiffreAffaires: 89 },
  { id: 6, nom: "Nathan Durand", email: "nathan.durand@email.com", ville: "Paris", dateInscription: "2026-07-12", commandes: 9, chiffreAffaires: 1560 },
  { id: 7, nom: "Sarah Dubois", email: "sarah.dubois@email.com", ville: "Lille", dateInscription: "2026-10-29", commandes: 3, chiffreAffaires: 340 },
  { id: 8, nom: "Adam Moreau", email: "adam.moreau@email.com", ville: "Bordeaux", dateInscription: "2026-06-05", commandes: 15, chiffreAffaires: 2950 },
];

function Clients() {
  const [recherche, setRecherche] = useState("");
  const [filtreVille, setFiltreVille] = useState("Toutes");
  const [tri, setTri] = useState("ca");

  const totalClients = clientsDemo.length;

  const nouveauxClients = clientsDemo.filter(
    (client) => client.dateInscription >= "2026-10-01"
  ).length;

  const chiffreAffairesTotal = clientsDemo.reduce(
    (total, client) => total + client.chiffreAffaires,
    0
  );

  const commandesTotales = clientsDemo.reduce(
    (total, client) => total + client.commandes,
    0
  );

  const panierMoyen = commandesTotales > 0
    ? chiffreAffairesTotal / commandesTotales
    : 0;

  const meilleursClients = useMemo(
    () =>
      [...clientsDemo]
        .sort((a, b) => b.chiffreAffaires - a.chiffreAffaires)
        .slice(0, 5),
    []
  );

  const clientsFiltres = clientsDemo
    .filter((client) => {
      const rechercheMinuscule = recherche.toLowerCase();

      const correspondRecherche =
        client.nom.toLowerCase().includes(rechercheMinuscule) ||
        client.email.toLowerCase().includes(rechercheMinuscule);

      const correspondVille =
        filtreVille === "Toutes" || client.ville === filtreVille;

      return correspondRecherche && correspondVille;
    })
    .sort((a, b) => {
      if (tri === "ca") return b.chiffreAffaires - a.chiffreAffaires;
      if (tri === "commandes") return b.commandes - a.commandes;
      return a.nom.localeCompare(b.nom);
    });

  const maximumCA = meilleursClients[0].chiffreAffaires;

  return (
    <div className="clients-page">
      <header className="header">
        <h1>Clients 👥</h1>
        <p>Comprenez votre clientèle et identifiez vos clients les plus importants.</p>
      </header>

      <div className="demo-notice">
        Données de démonstration — les informations seront connectées à la base de données ultérieurement.
      </div>

      <section className="clients-kpis">
        <div className="client-kpi">
          <span>Nombre de clients</span>
          <strong>{totalClients}</strong>
        </div>

        <div className="client-kpi">
          <span>Nouveaux clients</span>
          <strong>{nouveauxClients}</strong>
        </div>

        <div className="client-kpi">
          <span>Chiffre d'affaires clients</span>
          <strong>{chiffreAffairesTotal.toLocaleString("fr-FR")} €</strong>
        </div>

        <div className="client-kpi">
          <span>Panier moyen</span>
          <strong>{panierMoyen.toLocaleString("fr-FR", {
            maximumFractionDigits: 2,
          })} €</strong>
        </div>
      </section>

      <section className="top-clients">
        <div className="section-header">
          <h2>Meilleurs clients</h2>
          <p>Les cinq clients qui génèrent le plus de chiffre d'affaires.</p>
        </div>

        <div className="top-clients-list">
          {meilleursClients.map((client, index) => (
            <div className="top-client" key={client.id}>
              <div className="top-client-info">
                <span className="top-client-rank">{index + 1}</span>
                <span>{client.nom}</span>
                <strong>
                  {client.chiffreAffaires.toLocaleString("fr-FR")} €
                </strong>
              </div>

              <div className="top-client-bar">
                <div
                  className="top-client-progress"
                  style={{
                    width: `${(client.chiffreAffaires / maximumCA) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="clients-catalogue">
        <div className="section-header">
          <h2>Liste des clients</h2>
          <p>Retrouvez et analysez les informations de vos clients.</p>
        </div>

        <div className="clients-filters">
          <input
            type="text"
            placeholder="Rechercher un client ou un email..."
            value={recherche}
            onChange={(event) => setRecherche(event.target.value)}
          />

          <select
            value={filtreVille}
            onChange={(event) => setFiltreVille(event.target.value)}
          >
            <option value="Toutes">Toutes les villes</option>
            <option value="Lille">Lille</option>
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
            <option value="Bordeaux">Bordeaux</option>
          </select>

          <select value={tri} onChange={(event) => setTri(event.target.value)}>
            <option value="ca">Trier par chiffre d'affaires</option>
            <option value="commandes">Trier par commandes</option>
            <option value="nom">Trier par nom</option>
          </select>
        </div>

        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Ville</th>
                <th>Inscription</th>
                <th>Commandes</th>
                <th>Chiffre d'affaires</th>
              </tr>
            </thead>

            <tbody>
              {clientsFiltres.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="client-name">{client.nom}</div>
                    <div className="client-email">{client.email}</div>
                  </td>
                  <td>{client.ville}</td>
                  <td>
                    {new Date(client.dateInscription).toLocaleDateString("fr-FR")}
                  </td>
                  <td>{client.commandes}</td>
                  <td>
                    <strong>
                      {client.chiffreAffaires.toLocaleString("fr-FR")} €
                    </strong>
                  </td>
                </tr>
              ))}

              {clientsFiltres.length === 0 && (
                <tr>
                  <td colSpan={5}>Aucun client trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Clients;

