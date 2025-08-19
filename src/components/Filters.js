"use client";
import { useState } from "react";

export default function Filters({ onFilter }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const apply = () => onFilter({ search, genre, maxPrice: parseFloat(maxPrice) });

  return (
    <div className="mb-4">
      <input type="text" placeholder="Recherche..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-control mb-2" />
      <select value={genre} onChange={(e) => setGenre(e.target.value)} className="form-select mb-2">
        <option value="">Tous genres</option>
        <option value="Rock">Rock</option>
        <option value="Jazz">Jazz</option>
        <option value="Electro">Electro</option>
      </select>
      <input type="number" placeholder="Prix max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="form-control mb-2" />
      <button className="btn btn-primary" onClick={apply}>Filtrer</button>
    </div>
  );
}
