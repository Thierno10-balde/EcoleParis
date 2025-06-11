import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import School from './models/School.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// ➕ Ajoute cette route ici :
app.get('/schools', async (req, res) => {
  try {
    const schools = await School.find({});
    res.json(schools); // 👈 Ce sera consommé côté React
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend à l’écoute sur le port ${PORT}`);
});
