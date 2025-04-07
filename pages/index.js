
import { useState } from 'react';

export default function Home() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [color, setColor] = useState('braun geölt');
  const [accessories, setAccessories] = useState({
    aussenecke: '',
    innenecke: '',
    endabschluss: '',
    oberseitenabschluss: '',
    fensterbank: '',
    rahmen: '',
    wandabdeckung: '',
    trenner: '',
  });
  const [result, setResult] = useState(null);

  const prices = {
    'braun': 167.14,
    'braun geölt': 180.59,
    'schwarz': 180.59,
    'grau': 180.59,
    'ohne Holz': 113.36,
  };

  const roundUp240 = (val) => Math.ceil(parseFloat(val || 0) / 2.4);

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
      'Außenecke': roundUp240(accessories.aussenecke),
      'Innenecke': roundUp240(accessories.innenecke),
      'Endabschluss (Abschlusskante)': roundUp240(accessories.endabschluss),
      'Ober-/Seitenabschluss': roundUp240(accessories.oberseitenabschluss),
      'Fensterbank': roundUp240(accessories.fensterbank),
      'Rahmenabdeckung': roundUp240(accessories.rahmen),
      'Wandabdeckung': roundUp240(accessories.wandabdeckung),
      'Unterseite / Trenner': roundUp240(accessories.trenner),
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
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <img src="/logo.png" alt="WoodUpp Logo" style={{ maxHeight: "60px", objectFit: "contain" }} />
      </div>
      <h1 style={{ textAlign: "center" }}>AluWood Rechner mit Zubehör</h1>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
        <input type="number" step="0.01" placeholder="Wandbreite (m)" value={width} onChange={(e) => setWidth(e.target.value)} />
        <input type="number" step="0.01" placeholder="Wandhöhe (m)" value={height} onChange={(e) => setHeight(e.target.value)} />
        <select value={color} onChange={(e) => setColor(e.target.value)} style={{ gridColumn: 'span 2' }}>
          {Object.keys(prices).map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Zubehör – Längenangabe in Metern (wird auf 2,40 m-Stücke gerundet)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          {[
            ['aussenecke', 'Außenecke'],
            ['innenecke', 'Innenecke'],
            ['endabschluss', 'Endabschluss (Abschlusskante)'],
            ['oberseitenabschluss', 'Ober-/Seitenabschluss'],
            ['fensterbank', 'Fensterbank'],
            ['rahmen', 'Rahmenabdeckung (Fenster/Tür)'],
            ['wandabdeckung', 'Wandabdeckung'],
            ['trenner', 'Unterseite / Trenner'],
          ].map(([key, label]) => (
            <label key={key}>
              {label}:
              <input
                type="number"
                step="0.01"
                placeholder="Länge in m"
                value={accessories[key]}
                onChange={(e) =>
                  setAccessories({ ...accessories, [key]: e.target.value })
                }
                style={{ marginLeft: '0.5rem' }}
              />
            </label>
          ))}
        </div>
      </div>

      <button onClick={calculate} style={{ marginTop: '2rem', padding: '0.75rem 1.5rem' }}>
        Berechnen
      </button>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Ergebnis</h3>
          <p><strong>Paneele:</strong> {result.panelCount} Stück</p>
          <p><strong>Einzelpreis:</strong> {result.panelPrice} €</p>
          <p><strong>Gesamtpreis Paneele:</strong> {result.totalPanelPrice} €</p>
          <p><strong>Gesamtfläche:</strong> {result.totalArea} m²</p>
          <p><strong>Preis pro m²:</strong> {result.pricePerM2} €</p>
          <p><strong>Gesamtschrauben:</strong> {result.screws} Stück</p>
          <h4>Zubehör (gerundet auf 2,40 m):</h4>
          <ul style={{ paddingLeft: '1.2rem' }}>
            {Object.entries(result.zubehör).map(([key, val]) => (
              <li key={key}>{key}: {val} Stück</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
