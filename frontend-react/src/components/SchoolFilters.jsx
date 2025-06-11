// src/components/SchoolFilters.jsx
import React from "react";

const SchoolFilters = ({ search, setSearch, arr, setArr }) => {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="🔍 Rechercher une école..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={arr} onChange={(e) => setArr(e.target.value)}>
        <option value="">🏙️ Tous les arrondissements</option>
        {[...Array(20)].map((_, i) => (
          <option key={i} value={`${i + 1}ème Ardt`}>
            {i + 1}ᵉᵐᵉ Ardt
          </option>
        ))}
      </select>
    </div>
  );
};

export default SchoolFilters;
