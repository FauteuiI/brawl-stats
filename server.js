const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// METS TON TOKEN ICI
const SUPERCELL_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUyZWJhNjEzLWNmOGQtNGFjMy05MWNlLWEyMDYxY2MyMDNiYSIsImlhdCI6MTc3NTA3NTY5Mywic3ViIjoiZGV2ZWxvcGVyLzlmYjg1ZjY1LTMyMDAtZmQ0YS1mNzZlLWZhZmVhZWRmMDUzOSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.UtImp51mLxovIR_4--NGK2JeTHqFbpfEjJ8omqIlvN5vzLLt0PqHdeo2_QPdrSua-kylQcqrpz7kvBxcBEH_dw";

// 1. ROUTE POUR LES JOUEURS (API SUPERCELL)
app.get('/api/player/:tag', async (req, res) => {
    try {
        const tag = req.params.tag.replace('#', '%23');
        console.log("Appel joueur pour:", tag);
        const response = await axios.get(`https://api.brawlstars.com/v1/players/${tag}`, {
            headers: { 'Authorization': `Bearer ${SUPERCELL_TOKEN}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Erreur Player:", error.response?.status);
        res.status(500).json({ error: "Erreur API" });
    }
});

// 2. ROUTE POUR LES MAPS (C'ÉTAIT CELLE QUI MANQUAIT !)
app.get('/api/maps', async (req, res) => {
    try {
        // On utilise BrawlAPI pour les maps car ils fournissent les images
        const response = await axios.get('https://api.brawlapi.com/v1/events');
        res.json(response.data);
    } catch (error) {
        console.error("Erreur Maps:", error.message);
        res.status(500).json({ error: "Erreur Maps" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur complet prêt sur le port ${PORT}`));
