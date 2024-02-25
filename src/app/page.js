import Navbar from "./component/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-center mb-4">Welcome to CampusQuest!</h1>
          <p className="text-xl text-center mb-8">
            Embark on an adventure at MyDigitalSchool and uncover hidden secrets through captivating puzzles. Find the hidden QR codes to progress in your quest.
          </p>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-3">How to Play?</h2>
            <ol className="list-decimal list-inside text-lg mb-8">
              <li>Start your quest at the campus reception.</li>
              <li>Solve puzzles to find the location of the QR codes.</li>
              <li>Scan the QR code with your device to receive your next clue.</li>
              <li>Continue until you solve all puzzles and uncover the hidden treasure.</li>
            </ol>
            <a
              href="/quests"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start your quest now!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
