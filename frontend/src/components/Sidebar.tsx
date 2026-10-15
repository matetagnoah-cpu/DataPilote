import { NavLink } from "react-router-dom";

const navigationItems = [
  {label: "Dashboard", path: "/dashboard", icon: "📊"},
  {label: "Ventes", path: "/ventes", icon: "📈"},
  {label: "Produits", path: "/produits", icon: "📦"},
  {label: "Clients", path: "/clients", icon: "👥"},
  {label: "Vendeurs", path: "/vendeurs", icon: "👨‍💼"},
  {label: "Promotions", path: "/promotions", icon: "🎯"},
];
function Sidebar() {
    return (
      <aside className="sidebar">
        <h2>DataPilote</h2>
  
        <nav>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          </nav>
        </aside>
    );
  }
  
  export default Sidebar;