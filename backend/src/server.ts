import app from './app';// On importe l'application Express définie dans le fichier app.ts
const PORT = process.env.PORT || 3100;// On définit le port, soit depuis une variable d'environnement, soit 3100 par défaut

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});// On démarre le serveur et on affiche l'URL dans la console
