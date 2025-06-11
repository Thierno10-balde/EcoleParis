// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SchoolMap from "./components/SchoolMap";
import SchoolFilters from "./components/SchoolFilters";
import "./App.css";

const App = () => {
  const [schools, setSchools] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [arr, setArr] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/schools").then((res) => {
      setSchools(res.data);
    });
  }, []);

  useEffect(() => {
    let results = schools;

    if (search) {
      results = results.filter((s) =>
        s.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (arr) {
      results = results.filter((s) => s.arr === arr);
    }

    setFiltered(results);
  }, [search, arr, schools]);

  return (
    <div>
      <h1>🏫 Écoles de Paris</h1>
      <SchoolFilters search={search} setSearch={setSearch} arr={arr} setArr={setArr} />
      <SchoolMap schools={filtered} />
    </div>
  );
};

export default App;
