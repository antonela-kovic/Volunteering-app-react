import  { useState, useEffect } from 'react';
import axios from 'axios';     //sve je dobro edostaje samo css
import "./App.css";

function App() {
  // Stanja za pitanja, trenutno pitanje, korisničke odgovore, rezultat i završetak igre
  const [pitanja, postaviPitanja] = useState([]);
  const [trenutnoPitanjeIndex, postaviTrenutnoPitanjeIndex] = useState(0);
  const [korisnickeOdgovore, postaviKorisnickeOdgovore] = useState([]);
  const [rezultat, postaviRezultat] = useState(0);
  const [krajIgre, postaviKrajIgre] = useState(false);

  // Dohvaćanje pitanja nakon što se komponenta mounta
  useEffect(() => {
    dohvatiPitanja();
  }, []);

  // Funkcija za dohvaćanje pitanja preko API-ja
  const dohvatiPitanja = async () => {
    try {
      const odgovor = await axios.get('https://opentdb.com/api.php?amount=5');
      postaviPitanja(odgovor.data.results);
    } catch (error) {
      console.error('Greška pri dohvaćanju pitanja:', error);
    }
  };

  // Funkcija za obrađivanje odgovora na pitanje
  const obradiOdgovor = (odgovor) => {
    const trenutnoPitanje = pitanja[trenutnoPitanjeIndex];
    const jeLiTocan = odgovor === trenutnoPitanje.correct_answer;

    // Povećanje rezultata ako je odgovor točan
    if (jeLiTocan) {
      postaviRezultat(rezultat + 1);
    }

    // Pohrana korisničkog odgovora i prijelaz na sljedeće pitanje
    postaviKorisnickeOdgovore([...korisnickeOdgovore, { pitanje: trenutnoPitanje.question, odgovor, jeLiTocan }]);
    postaviTrenutnoPitanjeIndex(trenutnoPitanjeIndex + 1);

    // Provjera je li igra završena nakon odgovora na posljednje pitanje
    if (trenutnoPitanjeIndex === pitanja.length - 1) {
      postaviKrajIgre(true);
    }
  };

  // Funkcija za ponovno pokretanje igre
  const ponoviIgru = () => {
    postaviPitanja([]);
    postaviTrenutnoPitanjeIndex(0);
    postaviKorisnickeOdgovore([]);
    postaviRezultat(0);
    postaviKrajIgre(false);
    dohvatiPitanja();
  };

  // Pričekaj dok se pitanja ne dohvate
  if (!pitanja.length) {
    return <div>Učitavanje...</div>;
  }

  // Prikaz završnog zaslona nakon završetka igre
  if (krajIgre) {
    return (
      <div>
        <h1>Kraj igre</h1>
        <p>Vaš rezultat: {rezultat}</p>
        <button onClick={ponoviIgru}>Igraj ponovno</button>
      </div>
    );
  }

  // Trenutno pitanje
  const trenutnoPitanje = pitanja[trenutnoPitanjeIndex];

  return (
    <div>
      <h1>Kviz</h1>
      <p>Pitanje {trenutnoPitanjeIndex + 1} od {pitanja.length}</p>
      <h3>{trenutnoPitanje.question}</h3>
      {/* Prikaz odgovora */}
      {trenutnoPitanje.incorrect_answers.map((odgovor, index) => (
        <button key={index} onClick={() => obradiOdgovor(odgovor)}>{odgovor}</button>
      ))}
      <button onClick={() => obradiOdgovor(trenutnoPitanje.correct_answer)}>{trenutnoPitanje.correct_answer}</button>
      <p>Trenutni rezultat: {rezultat}</p>
      {/* Prikaz prethodnih odgovora */}
      <h4>Prethodni odgovori:</h4>
      <ul>
        {korisnickeOdgovore.map((item, index) => (
          <li key={index}>{item.pitanje} - {item.odgovor} ({item.jeLiTocan ? 'Točno' : 'Netočno'})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
