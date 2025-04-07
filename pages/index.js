
import { useState } from 'react';

export default function Home() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [color, setColor] = useState('braun geölt');
  const [accessories, setAccessories] = useState({
    wandabdeckung: '',
    fensterbank: '',
    rahmenabdeckung: '',
    trennprofil: '',
    endabschluss: '',
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
      'Wandabdeckung': roundUp240(parseFloat(accessories.wandabdeckung || 0)),
      'Fensterbank': roundUp240(parseFloat(accessories.fensterbank || 0)),
      'Rahmenabdeckung': roundUp240(parseFloat(accessories.rahmenabdeckung || 0)),
      'Trennprofil unten': roundUp240(parseFloat(accessories.trennprofil || 0)),
      'Endabschluss': roundUp240(parseFloat(accessories.endabschluss || 0)),
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

      <label>Wandbreite (m):</label>
      <input type="number" step="0.01" value={width} onChange={(e) => setWidth(e.target.value)} />

      <label>Wandhöhe (m):</label>
      <input type="number" step="0.01" value={height} onChange={(e) => setHeight(e.target.value)} />

      <label>Farbe:</label>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        {Object.keys(prices).map((p) => <option key={p}>{p}</option>)}
      </select>

      <hr style={{ margin: '2rem 0' }} />
      <h3>Zubehör (Längenangabe in Metern):</h3>

      <label>Wandabdeckung (z. B. auf Mauerkrone):</label>
      <input type="number" step="0.01" value={accessories.wandabdeckung} onChange={(e) => setAccessories({ ...accessories, wandabdeckung: e.target.value })} />

      <label>Fensterbank (unten):</label>
      <input type="number" step="0.01" value={accessories.fensterbank} onChange={(e) => setAccessories({ ...accessories, fensterbank: e.target.value })} />

      <label>Rahmenabdeckung (z. B. um Fenster/Tür):</label>
      <input type="number" step="0.01" value={accessories.rahmenabdeckung} onChange={(e) => setAccessories({ ...accessories, rahmenabdeckung: e.target.value })} />

      <label>Trennprofil (z. B. Sockel oder Zwischenraum):</label>
      <input type="number" step="0.01" value={accessories.trennprofil} onChange={(e) => setAccessories({ ...accessories, trennprofil: e.target.value })} />

      <label>Endabschluss (offene Seitenkante):</label>
      <input type="number" step="0.01" value={accessories.endabschluss} onChange={(e) => setAccessories({ ...accessories, endabschluss: e.target.value })} />

      <div style={{ marginTop: '2rem' }}>
        <button onClick={calculate}>Berechnen</button>
      </div>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Ergebnis</h3>
          <p><strong>Paneele:</strong> {result.panelCount} Stück</p>
          <p><strong>Einzelpreis:</strong> {result.panelPrice} €</p>
          <p><strong>Gesamtpreis Paneele:</strong> {result.totalPanelPrice} €</p>
          <p><strong>Fläche gesamt:</strong> {result.totalArea} m²</p>
          <p><strong>Preis pro m²:</strong> {result.pricePerM2} €</p>
          <p><strong>Schrauben gesamt:</strong> {result.screws} Stück</p>
          <h4>Zubehör (jeweils 2,40 m Stücke):</h4>
          <ul className="zubehoer-liste">
            {Object.entries(result.zubehör).map(([key, val]) => (
              <li key={key}>{key}: {val} Stück</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
