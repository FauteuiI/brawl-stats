const axios = require('axios'); // Vérifie que tu as bien installé axios

app.get('/quelle-est-mon-ip', async (req, res) => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        res.json({ 
            message: "Copie l'IP ci-dessous dans le portail Supercell",
            ip: response.data.ip 
        });
    } catch (error) {
        res.status(500).json({ error: "Impossible de récupérer l'IP" });
    }
});
