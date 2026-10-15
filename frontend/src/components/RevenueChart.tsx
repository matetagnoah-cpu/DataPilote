
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from "recharts";
  
  const revenueData = [
    { month: "January", revenue: 10000 },
    { month: "February", revenue: 12000 },
    { month: "March", revenue: 15000 },
    { month: "April", revenue: 13000 },
    { month: "May", revenue: 17000 },
    { month: "June", revenue: 20000 },
    { month: "July", revenue: 22000 },
    { month: "August", revenue: 25000 },
    { month: "September", revenue: 24000 },
    { month: "October", revenue: 26000 },
    { month: "November", revenue: 28000 },
    { month: "December", revenue: 30000 },
  ];
  
  function RevenueChart() {
    return (
      <div className="revenue-card">
        <div className="revenue-header">
          <div>
            <h2>Évolution du chiffre d'affaires</h2>
            <p>Les performances de votre entreprise sur 12 mois</p>
          </div>
  
          <span className="revenue-badge">+12,5 %</span>
        </div>
  
        <div className="revenue-total">
          <strong>24 520 €</strong>
          <span>Ce mois-ci</span>
        </div>
  
        <div className="revenue-chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 15, right: 15, left: 5, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
  
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
  
              <YAxis
                axisLine={false}
                tickLine={false}
                width={55}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickFormatter={(value: number) => `${value / 1000}k€`}
              />
  
              <Tooltip
                formatter={(value) => [
                  `${Number(value).toLocaleString("fr-FR")} €`,
                  "Chiffre d'affaires",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              />
  
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  
  export default RevenueChart;
  