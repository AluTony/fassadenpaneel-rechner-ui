
import { useState } from 'react';

export default function Home() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [color, setColor] = useState('braun geölt');
  const [accessories, setAccessories] = useState({
    aussenecke: 0,
    innenecke: 0,
    endabschluss: 0,
    fensterbank: 0,
    rahmen: 0,
    wandabdeckung: 0,
    trennprofil: 0,
  });
  const [result, setResult] = useState(null);

  const prices = {
    'braun': 167.14,
    'braun geölt': 180.59,
    'schwarz': 180.59,
    'grau': 180.59,
    'ohne Holz': 113.36,
  };

  const roundUp240 = (val) => Math.ceil(val / 2.4);

  const calculate = () => {
    const b = parseFloat(width);
    const h = parseFloat(height);
    if (!b || !h) return;

    const panelWidth = 0.425;
    const panelArea = panelWidth * h;
    const panelCount = Math.ceil(b / panelWidth);
    const pricePerM = prices[color] / 2.4;
    const panelPrice = +(pricePerM * h).toFixed(2);
    const totalPanelPrice = +(panelCount * panelPrice).toFixed(2);
    const totalArea = +(panelCount * panelArea).toFixed(2);
    const pricePerM2 = +(totalPanelPrice / totalArea).toFixed(2);
    const screws = panelCount * Math.max(3, Math.ceil(h / 0.6)) * 3;

    const zubehör = {
      'Außenecken': parseInt(accessories.aussenecke),
      'Innenecken': parseInt(accessories.innenecke),
      'Endabschlüsse': roundUp240(h * accessories.endabschluss),
      'Fensterbänke': roundUp240(accessories.fensterbank),
      'Rahmenabdeckungen': roundUp240(accessories.rahmen),
      'Wandabdeckungen': roundUp240(accessories.wandabdeckung),
      'Trennprofile': roundUp240(accessories.trennprofil),
    };

    setResult({
      panelCount,
      panelPrice,
      totalPanelPrice,
      totalArea,
      pricePerM2,
      screws,
      zubehör
    });
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem', maxWidth: 800, margin: 'auto' }}>
      <h1>AluWood Rechner mit Zubehör</h1>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <input type="number" step="0.01" placeholder="Wandbreite (m)" value={width} onChange={(e) => setWidth(e.target.value)} />
        <input type="number" step="0.01" placeholder="Wandhöhe (m)" value={height} onChange={(e) => setHeight(e.target.value)} />
        <select value={color} onChange={(e) => setColor(e.target.value)} style={{ gridColumn: 'span 2' }}>
          {Object.keys(prices).map((p) => <option key={p}>{p}</option>)}
        </select>

        <input type="number" placeholder="Außenecken (Stück)" value={accessories.aussenecke} onChange={(e) => setAccessories({ ...accessories, aussenecke: e.target.value })} />
        <input type="number" placeholder="Innenecken (Stück)" value={accessories.innenecke} onChange={(e) => setAccessories({ ...accessories, innenecke: e.target.value })} />
        <input type="number" placeholder="Endabschlüsse (Seiten)" value={accessories.endabschluss} onChange={(e) => setAccessories({ ...accessories, endabschluss: e.target.value })} />
        <input type="number" placeholder="Fensterbank Breite (m)" value={accessories.fensterbank} onChange={(e) => setAccessories({ ...accessories, fensterbank: e.target.value })} />
        <input type="number" placeholder="Rahmen Umfang (m)" value={accessories.rahmen} onChange={(e) => setAccessories({ ...accessories, rahmen: e.target.value })} />
        <input type="number" placeholder="Wandabdeckung Länge (m)" value={accessories.wandabdeckung} onChange={(e) => setAccessories({ ...accessories, wandabdeckung: e.target.value })} />
        <input type="number" placeholder="Trennprofil Länge (m)" value={accessories.trennprofil} onChange={(e) => setAccessories({ ...accessories, trennprofil: e.target.value })} />
      </div>

      <button onClick={calculate} style={{ marginTop: '1.5rem', padding: '0.5rem 1rem' }}>
        Berechnen
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Ergebnis</h3>
          <p><strong>Paneele:</strong> {result.panelCount} Stück</p>
          <p><strong>Einzelpreis:</strong> {result.panelPrice} €</p>
          <p><strong>Gesamtpreis Paneele:</strong> {result.totalPanelPrice} €</p>
          <p><strong>Fläche gesamt:</strong> {result.totalArea} m²</p>
          <p><strong>Preis pro m²:</strong> {result.pricePerM2} €</p>
          <p><strong>Schrauben gesamt:</strong> {result.screws} Stück</p>
          <h4>Zubehör (gerundet auf 2,40 m):</h4>
          <ul>
            {Object.entries(result.zubehör).map(([key, val]) => (
              <li key={key}>{key}: {val} Stück</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
