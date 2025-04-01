
import { useState } from 'react';
import Image from 'next/image';

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
    'ohne Holz': 113.36,
  };

  const berechne = () => {
    const b = parseFloat(breite);
    const h = parseFloat(hoehe);
    const standardLaenge = 2.4;
    const paneelBreite = 0.425;

    if (!b || !h || !farbe || !(farbe in farbpreise)) return;

    const anzahlPaneele = Math.ceil(b / paneelBreite);
    const basispreis = farbpreise[farbe];
    const preisProMeter = basispreis / standardLaenge;
    const einzelpreis = +(preisProMeter * h).toFixed(2);
    const gesamtpreis = +(anzahlPaneele * einzelpreis).toFixed(2);
    const flaecheProPaneel = +(paneelBreite * h).toFixed(4);
    const gesamtflaeche = +(anzahlPaneele * flaecheProPaneel).toFixed(2);
    const preisProM2 = +(gesamtpreis / gesamtflaeche).toFixed(2);

    setErgebnis({
      anzahlPaneele,
      einzelpreis,
      gesamtpreis,
      flaecheProPaneel,
      gesamtflaeche,
      preisProM2,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 text-gray-800 dark:text-gray-100">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Logo" width={300} height={80} className="object-contain w-auto max-h-20" />
        </div>

        <h1 className="text-4xl font-bold mb-10 text-center">AluWood Rechner</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input
            type="number"
            step="0.01"
            placeholder="Breite der Fläche (in m)"
            value={breite}
            onChange={(e) => setBreite(e.target.value)}
            className="p-5 text-xl border border-gray-300 dark:border-gray-700 rounded-xl w-full bg-white dark:bg-gray-800"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Höhe der Fläche (in m)"
            value={hoehe}
            onChange={(e) => setHoehe(e.target.value)}
            className="p-5 text-xl border border-gray-300 dark:border-gray-700 rounded-xl w-full bg-white dark:bg-gray-800"
          />
          <select
            value={farbe}
            onChange={(e) => setFarbe(e.target.value)}
            className="p-5 text-xl border border-gray-300 dark:border-gray-700 rounded-xl w-full md:col-span-2 bg-white dark:bg-gray-800"
          >
            <option value="braun">Braun</option>
            <option value="braun geölt">Braun geölt</option>
            <option value="schwarz">Schwarz</option>
            <option value="grau">Grau</option>
            <option value="ohne Holz">Ohne Holz</option>
          </select>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={berechne}
            className="bg-black text-white text-xl px-10 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Berechnen
          </button>
        </div>

        {ergebnis && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-inner grid gap-4 text-xl">
            <div><strong>Anzahl Paneele:</strong> {ergebnis.anzahlPaneele}</div>
            <div><strong>Einzelpreis:</strong> {ergebnis.einzelpreis} €</div>
            <div><strong>Gesamtpreis:</strong> {ergebnis.gesamtpreis} €</div>
            <div><strong>Fläche pro Paneel:</strong> {ergebnis.flaecheProPaneel} m²</div>
            <div><strong>Gesamtfläche:</strong> {ergebnis.gesamtflaeche} m²</div>
            <div><strong>Preis pro m²:</strong> {ergebnis.preisProM2} €</div>
          </div>
        )}
      </div>
    </div>
  );
}
