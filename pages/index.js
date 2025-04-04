
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [breite, setBreite] = useState('');
  const [hoehe, setHoehe] = useState('');
  const [farbe, setFarbe] = useState('braun geölt');
  const [wandabdeckungBreite, setWandabdeckungBreite] = useState('20mm');
  const [zubehoer, setZubehoer] = useState({
    aussenecke: false,
    innenecke: false,
    endabschluss: false,
    oberSeitenabschluss: false,
    rahmenabdeckung: false,
    wandabdeckung: false,
    fensterbank: false,
    trennprofil: false,
  });
  const [ergebnis, setErgebnis] = useState(null);

  const farbpreise = {
    'braun': 167.14,
    'braun geölt': 180.59,
    'schwarz': 180.59,
    'grau': 180.59,
    'ohne Holz': 113.36,
  };

  const zubehoerPreise = {
    standard: 50.0,
    guenstig: 36.89,
  };

  const handleCheckboxChange = (key) => {
    setZubehoer((prev) => ({ ...prev, [key]: !prev[key] }));
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
    const schraubenReihen = Math.max(3, Math.ceil(h / 0.6));
    const schraubenProPaneel = schraubenReihen * 3;
    const gesamtSchrauben = anzahlPaneele * schraubenProPaneel;

    let zubehoerListe = [];
    let zubehoerGesamt = 0;

    if (zubehoer.aussenecke) {
      zubehoerListe.push("Außenecke");
      zubehoerGesamt += zubehoerPreise.standard;
    }
    if (zubehoer.innenecke) {
      zubehoerListe.push("Innenecke");
      zubehoerGesamt += zubehoerPreise.standard;
    }
    if (zubehoer.endabschluss) {
      zubehoerListe.push("Endabschluss");
      zubehoerGesamt += zubehoerPreise.standard;
    }
    if (zubehoer.oberSeitenabschluss) {
      zubehoerListe.push("Ober-/Seitenabschluss");
      zubehoerGesamt += zubehoerPreise.standard;
    }
    if (zubehoer.rahmenabdeckung) {
      zubehoerListe.push("Rahmenabdeckung (z.B. Fenster/Tür)");
      zubehoerGesamt += zubehoerPreise.standard;
    }
    if (zubehoer.wandabdeckung) {
      zubehoerListe.push("Wandabdeckung (" + wandabdeckungBreite + ")");
      zubehoerGesamt += zubehoerPreise.standard;
    }
    if (zubehoer.fensterbank) {
      zubehoerListe.push("Fensterbank");
      zubehoerGesamt += zubehoerPreise.guenstig;
    }
    if (zubehoer.trennprofil) {
      zubehoerListe.push("Trennprofil Unterseite");
      zubehoerGesamt += zubehoerPreise.guenstig;
    }

    setErgebnis({
      anzahlPaneele,
      einzelpreis,
      gesamtpreis,
      flaecheProPaneel,
      gesamtflaeche,
      preisProM2,
      schraubenProPaneel,
      gesamtSchrauben,
      zubehoerListe,
      zubehoerGesamt: +zubehoerGesamt.toFixed(2),
    });
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-12 text-gray-800 dark:text-gray-100">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Logo" width={300} height={80} className="object-contain w-auto max-h-20" />
        </div>

        <h1 className="text-4xl font-bold mb-10 text-center">AluWood Rechner inkl. Zubehör</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <input type="number" step="0.01" placeholder="Breite (m)" value={breite} onChange={(e) => setBreite(e.target.value)} className="p-5 text-xl border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 w-full" />
          <input type="number" step="0.01" placeholder="Höhe (m)" value={hoehe} onChange={(e) => setHoehe(e.target.value)} className="p-5 text-xl border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 w-full" />
          <select value={farbe} onChange={(e) => setFarbe(e.target.value)} className="p-5 text-xl border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 w-full md:col-span-2">
            <option value="braun">Braun</option>
            <option value="braun geölt">Braun geölt</option>
            <option value="schwarz">Schwarz</option>
            <option value="grau">Grau</option>
            <option value="ohne Holz">Ohne Holz</option>
          </select>
        </div>

        <h2 className="text-2xl font-bold mb-4">Zubehör</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {Object.entries(zubehoer).map(([key, val]) => (
            key !== 'wandabdeckung' ? (
              <label key={key} className="flex items-center gap-2">
                <input type="checkbox" checked={val} onChange={() => handleCheckboxChange(key)} />
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            ) : (
              <div key={key}>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={val} onChange={() => handleCheckboxChange(key)} />
                  Wandabdeckung
                </label>
                <select value={wandabdeckungBreite} onChange={(e) => setWandabdeckungBreite(e.target.value)} className="mt-2 p-2 rounded bg-white text-black w-full">
                  <option value="20mm">20 mm</option>
                  <option value="25mm">25 mm</option>
                </select>
              </div>
            )
          ))}
        </div>

        <div className="flex justify-center mb-10">
          <button onClick={berechne} className="bg-black text-white text-xl px-10 py-4 rounded-xl hover:bg-gray-800 transition">Berechnen</button>
        </div>

        {ergebnis && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-inner grid gap-4 text-xl">
            <div><strong>Anzahl Paneele:</strong> {ergebnis.anzahlPaneele}</div>
            <div><strong>Einzelpreis:</strong> {ergebnis.einzelpreis} €</div>
            <div><strong>Gesamtpreis Paneele:</strong> {ergebnis.gesamtpreis} €</div>
            <div><strong>Fläche pro Paneel:</strong> {ergebnis.flaecheProPaneel} m²</div>
            <div><strong>Gesamtfläche:</strong> {ergebnis.gesamtflaeche} m²</div>
            <div><strong>Preis pro m²:</strong> {ergebnis.preisProM2} €</div>
            <div><strong>Schrauben pro Paneel:</strong> {ergebnis.schraubenProPaneel}</div>
            <div><strong>Gesamtanzahl Schrauben:</strong> {ergebnis.gesamtSchrauben}</div>
            <div><strong>Zubehörteile:</strong> {ergebnis.zubehoerListe.join(', ') || 'Keine'}</div>
            <div><strong>Zubehör Gesamtpreis (netto):</strong> {ergebnis.zubehoerGesamt} €</div>
          </div>
        )}
      </div>
    </div>
    
  );
}
