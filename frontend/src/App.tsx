
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import KpiCard from "./components/KpiCard";
import InsightCard from "./components/InsightCard";
import RevenueChart from "./components/RevenueChart";
import Ventes from "./pages/Ventes";

function Dashboard() {
  return (
    <>
      <header className="header">
        <h1>Bonjour 👋</h1>
        <p>Voici ce qu'il se passe actuellement dans votre entreprise.</p>
      </header>

      <section className="kpi-grid">
        <KpiCard title="Chiffre d'affaires" value="24 520 €" evolution="+12,5 %" />
        <KpiCard title="Ventes" value="1 248" evolution="+8,2 %" />
        <KpiCard title="Clients" value="842" evolution="+5,4 %" />
        <KpiCard title="Panier moyen" value="19,65 €" evolution="+3,1 %" />
      </section>

      <section className="dashboard-bottom">
        <RevenueChart />
      </section>

      <section className="insights-section">
        <div className="section-header">
          <h2>Ce qu'il faut retenir</h2>
          <p>Les informations importantes à connaître aujourd'hui.</p>
        </div>

        <div className="insights-grid">
          <InsightCard
            type="positive"
            title="Bonne nouvelle"
            description="Votre chiffre d'affaires progresse de 12,5 % ce mois-ci."
          />
          <InsightCard
            type="warning"
            title="Point d'attention"
            description="Les ventes du produit X ont diminué de 18 %."
          />
          <InsightCard
            type="recommendation"
            title="Recommandation"
            description="Une promotion pourrait être intéressante sur le produit X."
          />
        </div>
      </section>
    </>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="header">
      <h1>{title}</h1>
      <p>Cette section sera développée prochainement.</p>
    </section>
  );
}

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ventes" element={<Ventes />} />
          <Route path="/produits" element={<PlaceholderPage title="Produits" />} />
          <Route path="/clients" element={<PlaceholderPage title="Clients" />} />
          <Route path="/vendeurs" element={<PlaceholderPage title="Vendeurs" />} />
          <Route path="/promotions" element={<PlaceholderPage title="Promotions" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
