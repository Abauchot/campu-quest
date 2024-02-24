import Navbar from "./component/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-center mb-4">Bienvenue sur CampusQuest!</h1>
          <p className="text-xl text-center mb-8">
            Partez à l'aventure dans MyDigitalSchool et découvrez les secrets cachés à travers des énigmes captivantes. Trouvez les QR codes dissimulés pour avancer dans votre quête.
          </p>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-3">Comment jouer?</h2>
            <ol className="list-decimal list-inside text-lg mb-8">
              <li>Démarrez votre quête à l'accueil du campus.</li>
              <li>Résolvez les énigmes pour trouver l'emplacement des QR codes.</li>
              <li>Scannez le QR code avec votre appareil pour recevoir votre prochain indice.</li>
              <li>Continuez jusqu'à résoudre toutes les énigmes et dévoiler le trésor caché.</li>
            </ol>
            <a
              href="/quests"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Commencez votre quête maintenant!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
