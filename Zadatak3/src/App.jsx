import "./App.css";
import  { useState } from 'react';
import Sažetak from './Sazetak';
import Adresa from './Adresa';
import Kontakt from './Kontakt';
import Placanje from './NacinPlacanja';

function App() {
  const [ime, postaviIme] = useState('');
  const [drzava, postaviDrzavu] = useState('');
  const [adresa, postaviAdresu] = useState('');
  const [kontakt, postaviKontakt] = useState('');
  const [nacinPlacanja, postaviNacinPlacanja] = useState('');
  const [prihvacamUvjete, setPrihvacamUvjete] = useState(false);
  const [naruciPritisnuto, setNaruciPritisnuto] = useState(false);

  
  const handleCheckboxChange = () => {
    setPrihvacamUvjete(!prihvacamUvjete); 
  };

  const handleNaruciClick = () => {
    if (!prihvacamUvjete) {
      alert("Morate prihvatiti uvjete prije nego što možete nastaviti s narudžbom.");
      return; 
    }
    setNaruciPritisnuto(true);
  };


  return (
    <div>
      <header>
            <h5 >Račun --{">"}Plaćanje</h5>
      </header>
      <Kontakt kontakt={kontakt} postaviKontakt={postaviKontakt} />
      <Adresa ime={ime} drzava={drzava} adresa={adresa} postaviIme={postaviIme} postaviDrzavu={postaviDrzavu} postaviAdresu={postaviAdresu} />
      <Placanje nacinPlacanja={nacinPlacanja} postaviNacinPlacanja={postaviNacinPlacanja} />
      <label>
        <input 
          type="checkbox" 
          checked={prihvacamUvjete} 
          onChange={handleCheckboxChange} 
        />
        Prihvaćam uvjete
      </label>
      {prihvacamUvjete && <p>Hvala vam što ste prihvatili uvjete.</p>}
      <br/>
      <button className="naruci-btn" onClick={handleNaruciClick}>Naruči</button>
      {naruciPritisnuto && <Sažetak ime={ime} drzava={drzava} adresa={adresa} kontakt={kontakt} nacinPlacanja={nacinPlacanja} />}
    </div>
  );
}

export default App;


