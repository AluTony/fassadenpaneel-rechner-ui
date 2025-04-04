
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [breite, setBreite] = useState('');
  const [hoehe, setHoehe] = useState('');
  const [farbe, setFarbe] = useState('braun geölt');

  const [zubehoer, setZubehoer] = useState({
    aussenecke: 0,
    innenecke: 0,
    endabschluss: 0,
    oberseite: { oben: false, links: false, rechts: false, laenge: '' },
    fensterbank: '',
    rahmen: { breite: '', hoehe: '' },
    wandabdeckung: { laenge: '', breite: '20mm' },
    trennprofil: '',
  });

  const [ergebnis, setErgebnis] = useState(null);

  const farbpreise = {
    'braun': 167.14,
    'braun geölt': 180.59,
    'schwarz': 180.59,
    'grau': 180.59,
    'ohne Holz': 113.36,
  };

  const roundUp = (value) => Math.ceil(value / 2.4);

  const berechne = () => {
    const b = parseFloat(breite);
    const h = parseFloat(hoehe);
    if (!b || !h || !(farbe in farbpreise)) return;

    const paneelBreite = 0.425;
    const standardLaenge = 2.4;

    const anzahlPaneele = Math.ceil(b / paneelBreite);
    const preisProMeter = farbpreise[farbe] / standardLaenge;
    const einzelpreis = +(preisProMeter * h).toFixed(2);
    const gesamtpreis = +(anzahlPaneele * einzelpreis).toFixed(2);
    const flaeche = +(anzahlPaneele * paneelBreite * h).toFixed(2);
    const preisProM2 = +(gesamtpreis / flaeche).toFixed(2);
    const schrauben = anzahlPaneele * Math.max(3, Math.ceil(h / 0.6)) * 3;

    const z = zubehoer;

    const zubehörErgebnisse = {
      'Außenecken': parseInt(z.aussenecke || 0),
      'Innenecken': parseInt(z.innenecke || 0),
      'Endabschlüsse': roundUp(h * (parseInt(z.endabschluss || 0))),
      'Ober-/Seitenabschlüsse': roundUp(
        (z.oberseite.oben ? parseFloat(z.oberseite.laenge || 0) : 0) +
        (z.oberseite.links ? parseFloat(z.oberseite.laenge || 0) : 0) +
        (z.oberseite.rechts ? parseFloat(z.oberseite.laenge || 0) : 0)
      ),
      'Fensterbank': roundUp(parseFloat(z.fensterbank || 0)),
      'Rahmenabdeckung': roundUp(
        2 * parseFloat(z.rahmen.breite || 0) + 2 * parseFloat(z.rahmen.hoehe || 0)
      ),
      'Wandabdeckung (' + z.wandabdeckung.breite + ')': roundUp(parseFloat(z.wandabdeckung.laenge || 0)),
      'Trennprofil unten': roundUp(parseFloat(z.trennprofil || 0)),
    };

    setErgebnis({
      anzahlPaneele,
      einzelpreis,
      gesamtpreis,
      flaeche,
      preisProM2,
      schrauben,
      zubehörErgebnisse
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={240} height={80} className="object-contain" />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">AluWood Zubehör-Rechner</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="number" placeholder="Wandbreite (m)" value={breite} onChange={(e) => setBreite(e.target.value)} className="p-4 rounded border w-full text-black" />
          <input type="number" placeholder="Wandhöhe (m)" value={hoehe} onChange={(e) => setHoehe(e.target.value)} className="p-4 rounded border w-full text-black" />
          <select value={farbe} onChange={(e) => setFarbe(e.target.value)} className="p-4 rounded border w-full text-black md:col-span-2">
            {Object.keys(farbpreise).map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <input type="number" placeholder="Anzahl Außenecken" value={zubehoer.aussenecke} onChange={(e) => setZubehoer({ ...zubehoer, aussenecke: e.target.value })} className="p-4 rounded border w-full text-black" />
          <input type="number" placeholder="Anzahl Innenecken" value={zubehoer.innenecke} onChange={(e) => setZubehoer({ ...zubehoer, innenecke: e.target.value })} className="p-4 rounded border w-full text-black" />
          <input type="number" placeholder="Endabschlüsse (1 oder 2 Seiten)" value={zubehoer.endabschluss} onChange={(e) => setZubehoer({ ...zubehoer, endabschluss: e.target.value })} className="p-4 rounded border w-full text-black" />

          <div className="space-y-1">
            <label className="font-semibold">Ober-/Seitenabschluss</label>
            <div className="flex gap-4 items-center">
              <label><input type="checkbox" checked={zubehoer.oberseite.oben} onChange={(e) => setZubehoer({ ...zubehoer, oberseite: { ...zubehoer.oberseite, oben: e.target.checked } })} /> oben</label>
              <label><input type="checkbox" checked={zubehoer.oberseite.links} onChange={(e) => setZubehoer({ ...zubehoer, oberseite: { ...zubehoer.oberseite, links: e.target.checked } })} /> links</label>
              <label><input type="checkbox" checked={zubehoer.oberseite.rechts} onChange={(e) => setZubehoer({ ...zubehoer, oberseite: { ...zubehoer.oberseite, rechts: e.target.checked } })} /> rechts</label>
            </div>
            <input type="number" placeholder="Länge je Seite (m)" value={zubehoer.oberseite.laenge} onChange={(e) => setZubehoer({ ...zubehoer, oberseite: { ...zubehoer.oberseite, laenge: e.target.value } })} className="p-2 rounded border w-full text-black" />
          </div>

          <input type="number" placeholder="Fensterbank Breite (m)" value={zubehoer.fensterbank} onChange={(e) => setZubehoer({ ...zubehoer, fensterbank: e.target.value })} className="p-4 rounded border w-full text-black" />

          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="Rahmen Breite (m)" value={zubehoer.rahmen.breite} onChange={(e) => setZubehoer({ ...zubehoer, rahmen: { ...zubehoer.rahmen, breite: e.target.value } })} className="p-2 rounded border text-black" />
            <input type="number" placeholder="Rahmen Höhe (m)" value={zubehoer.rahmen.hoehe} onChange={(e) => setZubehoer({ ...zubehoer, rahmen: { ...zubehoer.rahmen, hoehe: e.target.value } })} className="p-2 rounded border text-black" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="Wandabdeckung Länge (m)" value={zubehoer.wandabdeckung.laenge} onChange={(e) => setZubehoer({ ...zubehoer, wandabdeckung: { ...zubehoer.wandabdeckung, laenge: e.target.value } })} className="p-2 rounded border text-black" />
            <select value={zubehoer.wandabdeckung.breite} onChange={(e) => setZubehoer({ ...zubehoer, wandabdeckung: { ...zubehoer.wandabdeckung, breite: e.target.value } })} className="p-2 rounded border text-black">
              <option value="20mm">20 mm</option>
              <option value="25mm">25 mm</option>
            </select>
          </div>

          <input type="number" placeholder="Trennprofil unten (Länge m)" value={zubehoer.trennprofil} onChange={(e) => setZubehoer({ ...zubehoer, trennprofil: e.target.value })} className="p-4 rounded border w-full text-black" />
        </div>

        <div className="text-center mt-6">
          <button onClick={berechne} className="bg-black text-white px-8 py-3 rounded-xl text-lg">Berechnen</button>
        </div>

        {ergebnis && (
          <div className="mt-10 bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow text-lg text-black dark:text-white">
            <p><strong>Paneele:</strong> {ergebnis.anzahlPaneele} Stück</p>
            <p><strong>Einzelpreis:</strong> {ergebnis.einzelpreis} €</p>
            <p><strong>Gesamtpreis Paneele:</strong> {ergebnis.gesamtpreis} €</p>
            <p><strong>Fläche:</strong> {ergebnis.flaeche} m²</p>
            <p><strong>Preis pro m²:</strong> {ergebnis.preisProM2} €</p>
            <p><strong>Gesamtschrauben:</strong> {ergebnis.schrauben} Stück</p>
            <hr className="my-4" />
            <p className="font-bold mb-2">Zubehör (Stückzahlen auf 2,40m gerundet):</p>
            <ul className="list-disc ml-6 space-y-1">
              {Object.entries(ergebnis.zubehörErgebnisse).map(([key, val]) => (
                <li key={key}>{key}: {val} Stück</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
