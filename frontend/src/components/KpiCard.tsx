interface KpiCardProps {
    title: string;
    value: string;
    evolution: string;
  }
  
  function KpiCard({ title, value, evolution }: KpiCardProps) {
    return (
      <div className="kpi-card">
        <h3>{title}</h3>
        <strong>{value}</strong>
        <p>{evolution}</p>
      </div>
    );
  }
  
  export default KpiCard;