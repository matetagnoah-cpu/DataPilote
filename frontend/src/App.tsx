import Sidebar from "./components/Sidebar";
import KpiCard from "./components/KpiCard";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <header className="header">
          <h1>Bonjour 👋</h1>

          <p>
            Voici ce qu'il se passe actuellement dans votre entreprise.
          </p>
        </header>

        <section className="kpi-grid">
          <KpiCard
            title="Chiffre d'affaires"
            value="24 520 €"
            evolution="+12,5 %"
          />

          <KpiCard
            title="Ventes"
            value="1 248"
            evolution="+8,2 %"
          />

          <KpiCard
            title="Clients"
            value="842"
            evolution="+5,4 %"
          />

          <KpiCard
            title="Panier moyen"
            value="19,65 €"
            evolution="+3,1 %"
          />
        </section>
      </main>
    </div>
  );
}

export default App;