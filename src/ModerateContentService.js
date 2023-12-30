import axios from 'axios';

const API_KEY = process.env.API_KEY
const BASE_URL = 'https://api.moderatecontent.com/text/';
async function analyserTexte(text) {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                exclude: 'ho,hell', // Liste de mots à exclure
                replace: '******', // Caractères de remplacement
                key: API_KEY,
                msg: text,
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'analyse du texte :", error);
        return null;
    }
}

export { BASE_URL, analyserTexte };
