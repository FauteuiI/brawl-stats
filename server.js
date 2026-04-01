const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Route pour les joueurs (Via BrawlAPI : Pas besoin de clé IP !)
app.get('/api/player/:tag', async (req, res) => {
    try {
        const tag = req.params.tag.replace('#', '');
        const response = await axios.get(`https://api.brawlapi.com/v1/player?tag=${tag}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Joueur introuvable ou erreur API" });
    }
});

// Route pour les maps et événements
app.get('/api/maps', async (req, res) => {
    try {
        const response = await axios.get('https://api.brawlapi.com/v1/events');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erreur Maps" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur prêt sur le port ${PORT}`));