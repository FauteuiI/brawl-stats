const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Route pour les joueurs via BrawlAPI
app.get('/api/player/:tag', async (req, res) => {
    try {
        const tag = req.params.tag.replace('#', '');
        // On utilise BrawlAPI qui est beaucoup plus stable pour Render
        const response = await axios.get(`https://api.brawlapi.com/v1/player?tag=${tag}`);
        res.json(response.data);
    } catch (error) {
        console.error("Erreur API Joueur:", error.message);
        res.status(500).json({ error: "Erreur serveur ou joueur introuvable" });
    }
});

// Route pour les maps
app.get('/api/maps', async (req, res) => {
    try {
        const response = await axios.get('https://api.brawlapi.com/v1/events');
        res.json(response.data);
    } catch (error) {
        console.error("Erreur API Maps:", error.message);
        res.status(500).json({ error: "Erreur Maps" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur prêt sur le port ${PORT}`));
