const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// METS TON TOKEN ICI (Garde bien les guillemets)
const SUPERCELL_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUyZWJhNjEzLWNmOGQtNGFjMy05MWNlLWEyMDYxY2MyMDNiYSIsImlhdCI6MTc3NTA3NTY5Mywic3ViIjoiZGV2ZWxvcGVyLzlmYjg1ZjY1LTMyMDAtZmQ0YS1mNzZlLWZhZmVhZWRmMDUzOSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.UtImp51mLxovIR_4--NGK2JeTHqFbpfEjJ8omqIlvN5vzLLt0PqHdeo2_QPdrSua-kylQcqrpz7kvBxcBEH_dw";

app.get('/api/player/:tag', async (req, res) => {
    try {
        const tag = req.params.tag.replace('#', '%23'); 
        console.log("Tentative d'appel Supercell pour le tag:", tag);
        
        const response = await axios.get(`https://api.brawlstars.com/v1/players/${tag}`, {
            headers: { 
                'Authorization': `Bearer ${SUPERCELL_TOKEN}`,
                'Accept': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        // Ça, ça va nous dire dans Render pourquoi ça rate (IP, Token, etc.)
        console.error("ERREUR SUPERCELL :", error.response?.status, error.response?.data);
        res.status(500).json({ error: "Erreur API Supercell", details: error.response?.data });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur Supercell en ligne sur le port ${PORT}`));
