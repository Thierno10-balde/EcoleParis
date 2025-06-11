// backend/seedSchools.js

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';
import School from './models/School.js';
import neo4j from 'neo4j-driver';

dotenv.config();

// Connexion MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Connecté à MongoDB');

// Connexion Neo4j
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS)
);
const session = driver.session();

const datasets = [
  {
    name: 'maternelles',
    url: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=etablissements-scolaires-maternelles&rows=1000'
  },
  {
    name: 'elementaires',
    url: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=etablissements-scolaires-elementaires&rows=1000'
  },
  {
    name: 'colleges',
    url: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=etablissements-scolaires-colleges&rows=1000'
  },
  {
    name: 'lycees',
    url: 'https://opendata.paris.fr/api/records/1.0/search/?dataset=etablissements-scolaires-lycees&rows=1000'
  }
];


try {
  for (const ds of datasets) {
    console.log(`📦 Importation des ${ds.name}...`);

    try {
      const { data } = await axios.get(ds.url);
      for (const record of data.records) {
        const f = record.fields;

        const school = {
          id: record.recordid,
          name: f.libelle,
          address: f.adresse,
          arr: f.arr_libelle,
          coordinates: {
            type: 'Point',
            coordinates: f.geo_shape?.coordinates,
          },
        };

        if (!school.name || !school.arr || !school.coordinates?.coordinates) {
          console.warn(`⛔ Ignoré : ${record.recordid}`);
          console.log('🔍 Données brutes :', {
            nom: school.name,
            adresse: school.address,
            arrondissement: school.arr,
            coordonnées: school.coordinates?.coordinates
          });
          continue;
        }

        // Enregistrement dans MongoDB
        await School.updateOne({ id: school.id }, { $set: school }, { upsert: true });

        // Enregistrement dans Neo4j
        await session.run(
          `MERGE (s:School {id: $id})
           SET s.name = $name, s.address = $address, s.arr = $arr, s.coords = point({longitude: $lon, latitude: $lat})`,
          {
            id: school.id,
            name: school.name,
            address: school.address,
            arr: school.arr,
            lon: school.coordinates.coordinates[0],
            lat: school.coordinates.coordinates[1],
          }
        );

        console.log(`✅ ${school.name} importé`);
      }

    } catch (error) {
      console.error(`❌ Erreur import ${ds.name} :`, error.message);
    }
  }

} catch (err) {
  console.error('❌ Erreur globale :', err.message);
} finally {
  await session.close();
  await driver.close();
  await mongoose.disconnect();
  console.log('🔌 Déconnecté de MongoDB');
}
