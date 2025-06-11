function SchoolList({ schools }) {
  if (!Array.isArray(schools)) return <p>Données invalides.</p>;
  if (schools.length === 0) return <p>Aucune école trouvée.</p>;

  return (
    <ul>
      {schools.map(school => (
        <li key={school.id} style={{ marginBottom: '10px' }}>
          <strong>{school.name}</strong><br />
          📍 {school.address}<br />
          🏛️ {school.arr}
        </li>
      ))}
    </ul>
  );
}


export default SchoolList;
