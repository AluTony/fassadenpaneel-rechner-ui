
import { useState } from 'react';

export default function Home() {
  const [breite, setBreite] = useState('');
  const [hoehe, setHoehe] = useState('');
  const [farbe, setFarbe] = useState('braun geölt');
  const [ergebnis, setErgebnis] = useState(null);

  const farbpreise = {
    'braun': 167.14,
    'braun geölt': 180.59,
    'schwarz': 180.59,
    'grau': 180.59,
  };

  const berechne = () => {
    const b = parseFloat(breite);
    const h = parseFloat(hoehe);
    const paneelBreite = 0.425;
    const standardLaenge = 2.4;

    if (!b || !h || !farbe || !(farbe in farbpreise)) return;

    const anzahlPaneele = Math.ceil(b / paneelBreite);
    const einzelpreis = parseFloat(((h / standardLaenge) * farbpreise[farbe]).toFixed(2));
    const gesamtpreis = parseFloat((anzahlPaneele * einzelpreis).toFixed(2));
    const flaeche = +(b * h).toFixed(2);
    const preisProM2 = +(gesamtpreis / flaeche).toFixed(2);

    setErgebnis({
      anzahlPaneele,
      einzelpreis,
      gesamtpreis,
      flaeche,
      preisProM2,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Fassadenpaneel-Rechner</h1>

        <div className="grid gap-4 mb-6">
          <input
            type="number"
            step="0.01"
            placeholder="Breite der Fläche (in m)"
            value={breite}
            onChange={(e) => setBreite(e.target.value)}
            className="p-4 text-lg border border-gray-300 rounded-xl w-full"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Höhe der Fläche (in m)"
            value={hoehe}
            onChange={(e) => setHoehe(e.target.value)}
            className="p-4 text-lg border border-gray-300 rounded-xl w-full"
          />
          <select
            value={farbe}
            onChange={(e) => setFarbe(e.target.value)}
            className="p-4 text-lg border border-gray-300 rounded-xl w-full"
          >
            <option value="braun">Braun</option>
            <option value="braun geölt">Braun geölt</option>
            <option value="schwarz">Schwarz</option>
            <option value="grau">Grau</option>
          </select>
          <button
            onClick={berechne}
            className="bg-black text-white text-lg py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Berechnen
          </button>
        </div>

        {ergebnis && (
          <div className="bg-gray-100 rounded-2xl p-6 shadow-inner space-y-3">
            <div className="text-lg"><strong>Anzahl Paneele:</strong> {ergebnis.anzahlPaneele}</div>
            <div className="text-lg"><strong>Einzelpreis:</strong> {ergebnis.einzelpreis} €</div>
            <div className="text-lg"><strong>Gesamtpreis:</strong> {ergebnis.gesamtpreis} €</div>
            <div className="text-lg"><strong>Fläche:</strong> {ergebnis.flaeche} m²</div>
            <div className="text-lg"><strong>Preis pro m²:</strong> {ergebnis.preisProM2} €</div>
          </div>
        )}
      </div>
    </div>
  );
}
