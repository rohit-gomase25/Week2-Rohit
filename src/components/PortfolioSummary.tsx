import React, { useState } from "react";
import { usePortfolioStore } from "../stores/usePortfolioStore";

const PortfolioSummary: React.FC = () => {
  // 1. Consume the global state from your Zustand store
  const { holdings, totalValue, gainLoss, isLoading, error } = usePortfolioStore();

  // 2. Keep local state for UI-only filtering
  const [selectedSector, setSelectedSector] = useState<string>("All");

  // Handle Loading and Error states from the store
  if (isLoading) {
    return <p>Loading portfolio...</p>;
  }

  if (error) {
    return <p style={{ color: "#dc2626" }}>Error: {error}</p>;
  }

  // Filter holdings based on the selected sector
  const filtered =
    selectedSector === "All"
      ? holdings
      : holdings.filter((s) => s.sector === selectedSector);

  return (
    <div style={{ border: "1px solid #D1D5DB", borderRadius: 8, padding: 16, backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0, color: '#1E40AF' }}>Portfolio Performance</h3>
      
      <div style={{ marginBottom: 16 }}>
        <p style={{ margin: "4px 0", fontWeight: "bold" }}>
          Total Value: ${totalValue.toFixed(2)}
        </p>
        <p style={{ margin: "4px 0", color: gainLoss >= 0 ? "#16a34a" : "#dc2626", fontWeight: "bold" }}>
          Gain/Loss: {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)}
        </p>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="sector-filter" style={{ marginRight: 8, fontSize: '14px' }}>Filter by Sector:</label>
        <select 
          id="sector-filter"
          value={selectedSector} 
          onChange={(e) => setSelectedSector(e.target.value)}
          style={{ padding: '4px', borderRadius: '4px', border: '1px solid #94a3b8' }}
        >
          <option value="All">All Sectors</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Automotive">Automotive</option>
        </select>
      </div>

      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {filtered.length > 0 ? (
          filtered.map((stock) => (
            <li key={stock.id} style={{ marginBottom: 4 }}>
              <strong>{stock.symbol}</strong>: ${stock.price.toFixed(2)} 
              <span style={{ fontSize: '12px', color: '#64748b', marginLeft: 8 }}>({stock.sector})</span>
            </li>
          ))
        ) : (
          <p style={{ fontSize: '14px', color: '#94a3b8' }}>No holdings in this sector.</p>
        )}
      </ul>
    </div>
  );
};

export default PortfolioSummary;