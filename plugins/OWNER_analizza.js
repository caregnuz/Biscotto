import axios from 'axios';

const API_KEY = 'fc346dd5950b3784f028b39373cf62006d1a4f13f339a1127472b33a19dec06c'; 
async function analyzeURL(url) {
    try {
        
        const postResponse = await axios.post(
            'https://www.virustotal.com/api/v3/urls',
            new URLSearchParams({ url: url }).toString(),
            {
                headers: {
                    'x-apikey': API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        
        const analysisId = postResponse.data.data.id;

       
        const getResponse = await axios.get(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            { headers: { 'x-apikey': API_KEY } }
        );

        const analysis = getResponse.data.data;
        const stats = analysis.attributes.stats;

        
        return `🔍 *Analisi URL* 🔍
        
🌐 *URL:* ${url}
🛡️ *Sicuro:* ${stats.harmless} | ⚠️ *Pericoloso:* ${stats.malicious}
🔬 *Ultima analisi:* ${new Date(analysis.attributes.date * 1000).toLocaleString()}
🔗 *Dettagli:* [VirusTotal](${analysis.links.self})`;
    } catch (error) {
        console.error(error);
        return `❌ Errore nell'analisi dell'URL: ${error.response?.status || error.message}`;
    }
}


const handler = async (m, { text }) => {
    if (!text) {
        return m.reply("*📌 Esempio di uso: .analizza https://example.com*");
    }

    const result = await analyzeURL(text);
    m.reply(result);
};

handler.help = ["analyze"];
handler.tags = ["tools"];
handler.command = ["analizza"];
handler.owner = true;

export default handler;
