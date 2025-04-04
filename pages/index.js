
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
    <div>Konfigurator wird geladen...</div>
  );
}
