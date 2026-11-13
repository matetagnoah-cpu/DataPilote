import React, { useState } from 'react';

// Interface pour la structure d'un produit
interface Produit {
  id: string;
  reference: string;
  nom: string;
  categorie: string;
  prixUnitaire: number;
  stock: number;
  seuilAlerte: number;
  statut: 'En stock' | 'Stock bas' | 'Rupture';
  ventesTotal: number;
}

// Données fictives (mock)
const INITIAL_PRODUCTS: Produit[] = [
  {
    id: '1',
    reference: 'PROD-001',
    nom: 'Chaise Ergonomique V1',
    categorie: 'Mobilier',
    prixUnitaire: 199.99,
    stock: 45,
    seuilAlerte: 10,
    statut: 'En stock',
    ventesTotal: 120,
  },
  {
    id: '2',
    reference: 'PROD-002',
    nom: 'Bureau Assis-Debout',
    categorie: 'Mobilier',
    prixUnitaire: 499.00,
    stock: 4,
    seuilAlerte: 5,
    statut: 'Stock bas',
    ventesTotal: 85,
  },
  {
    id: '3',
    reference: 'PROD-003',
    nom: 'Écran 27" 4K',
    categorie: 'Électronique',
    prixUnitaire: 349.50,
    stock: 0,
    seuilAlerte: 8,
    statut: 'Rupture',
    ventesTotal: 210,
  },
  {
    id: '4',
    reference: 'PROD-004',
    nom: 'Clavier Mécanique Sans Fil',
    categorie: 'Accessoires',
    prixUnitaire: 89.90,
    stock: 18,
    seuilAlerte: 10,
    statut: 'En stock',
    ventesTotal: 340,
  },
  {
    id: '5',
    reference: 'PROD-005',
    nom: 'Casque Réduction de Bruit',
    categorie: 'Électronique',
    prixUnitaire: 179.00,
    stock: 3,
    seuilAlerte: 5,
    statut: 'Stock bas',
    ventesTotal: 95,
  },
];

export const Produits: React.FC = () => {
  const [produits] = useState<Produit[]>(INITIAL_PRODUCTS);
  const [recherche, setRecherche] = useState('');
  const [filtreStatut, setFiltreStatut] = useState<string>('Tous');

  // 1. Calculs des indicateurs commerciaux
  const totalProduits = produits.length;
  const valeurTotaleStock = produits.reduce(
    (acc, p) => acc + p.prixUnitaire * p.stock,
    0
  );
  
  // Produit le plus performant (basé sur le volume de ventes)
  const produitTopPerformant = [...produits].sort(
    (a, b) => b.ventesTotal - a.ventesTotal
  )[0];

  // 3. Alertes de stock
  const produitsAlertes = produits.filter(
    (p) => p.statut === 'Stock bas' || p.statut === 'Rupture'
  );

  // Filtrage du tableau
  const produitsFiltres = produits.filter((p) => {
    const matchRecherche =
      p.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      p.reference.toLowerCase().includes(recherche.toLowerCase()) ||
      p.categorie.toLowerCase().includes(recherche.toLowerCase());

    const matchStatut =
      filtreStatut === 'Tous' || p.statut === filtreStatut;

    return matchRecherche && matchStatut;
  });

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>Gestion des Produits</h1>

      {/* 2. Section Indicateurs Commerciaux */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={cardStyle}>
          <h3>Nombre de Produits</h3>
          <p style={kpiStyle}>{totalProduits}</p>
        </div>
        <div style={cardStyle}>
          <h3>Valeur du Stock</h3>
          <p style={kpiStyle}>
            {valeurTotaleStock.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
            })}
          </p>
        </div>
        <div style={cardStyle}>
          <h3>Top Produit (Ventes)</h3>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '8px 0' }}>
            {produitTopPerformant ? produitTopPerformant.nom : 'N/A'}
          </p>
          <small>{produitTopPerformant?.ventesTotal} unités vendues</small>
        </div>
      </div>

      {/* 3. Section Alertes de Stock */}
      {produitsAlertes.length > 0 && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeeba',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ color: '#856404', marginTop: 0 }}>
            ⚠️ Alertes de Réapprovisionnement ({produitsAlertes.length})
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#856404' }}>
            {produitsAlertes.map((p) => (
              <li key={p.id}>
                <strong>{p.nom}</strong> ({p.reference}) — Stock actuel :{' '}
                <strong>{p.stock}</strong> (Seuil : {p.seuilAlerte}) — Statut :{' '}
                <em>{p.statut}</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Barre de recherche et filtre */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          placeholder="Rechercher par nom, réf. ou catégorie..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            flex: '1',
            minWidth: '200px',
          }}
        />

        <select
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
          <option value="Tous">Tous les statuts</option>
          <option value="En stock">En stock</option>
          <option value="Stock bas">Stock bas</option>
          <option value="Rupture">Rupture</option>
        </select>
      </div>

      {/* 1. Tableau Catalogue des produits */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f4f4f6', borderBottom: '2px solid #ddd' }}>
              <th style={thStyle}>Référence</th>
              <th style={thStyle}>Nom</th>
              <th style={thStyle}>Catégorie</th>
              <th style={thStyle}>Prix unitaire</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {produitsFiltres.length > 0 ? (
              produitsFiltres.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{p.reference}</td>
                  <td style={tdStyle}>{p.nom}</td>
                  <td style={tdStyle}>{p.categorie}</td>
                  <td style={tdStyle}>
                    {p.prixUnitaire.toLocaleString('fr-FR', {
                      style: 'currency',
                      currency: 'EUR',
                    })}
                  </td>
                  <td style={tdStyle}>{p.stock}</td>
                  <td style={tdStyle}>
                    <span style={getStatutBadgeStyle(p.statut)}>
                      {p.statut}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ ...tdStyle, textAlign: 'center' }}>
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles en ligne réutilisables
const cardStyle: React.CSSProperties = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '16px',
};

const kpiStyle: React.CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  margin: '8px 0 0 0',
};

const thStyle: React.CSSProperties = {
  padding: '12px',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
};

const getStatutBadgeStyle = (statut: Produit['statut']): React.CSSProperties => {
  const base: React.CSSProperties = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  };

  switch (statut) {
    case 'En stock':
      return { ...base, backgroundColor: '#d4edda', color: '#155724' };
    case 'Stock bas':
      return { ...base, backgroundColor: '#fff3cd', color: '#856404' };
    case 'Rupture':
      return { ...base, backgroundColor: '#f8d7da', color: '#721c24' };
    default:
      return base;
  }
};

export default Produits;