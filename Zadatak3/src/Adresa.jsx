import { useState } from 'react';
import PropTypes from "prop-types";
import "./App.css";

function Adresa({ime,drzava,adresa,postaviIme,postaviAdresu,postaviDrzavu}) {
  const [imeError, postaviImeError] = useState('');
  const [adresaError, postaviAdresaError] = useState('');
  const maxImeDuljina = 20;

  const handleImeChange = (e) => {
    const novoIme = e.target.value;
    postaviIme(novoIme);
    if (novoIme.length > maxImeDuljina) {
      postaviImeError(`Ime ne smije biti duže od ${maxImeDuljina} znakova.`);
    } else {
      postaviImeError('');
    }
  };

  const handleAdresaChange = (e) => {
    const novaAdresa = e.target.value;
    postaviAdresu(novaAdresa);
    // Provjeravamo je li adresa prazna 
    if (novaAdresa.trim() === '' ) {
      postaviAdresaError('Adresa mora biti unesena');
    } else {
      postaviAdresaError('');
    }
  };

  return (
    <div>
      <h5>Adresa</h5>
      <div className="kontakt-container2">
      <h6>Ime:</h6>
      <input type="text" value={ime} onChange={handleImeChange} />
      {imeError && <p style={{ color: 'red' }}>{imeError}</p>}
      <h6>Država:</h6>
      <select value={drzava} onChange={(e) => postaviDrzavu(e.target.value)}>
        <option value="">Odaberite državu...</option>
        <option value="Hrvatska">Hrvatska</option>
        <option value="Srbija">Srbija</option>
        <option value="Bosna i Hercegovina">Bosna i Hercegovina</option>
      </select>
      <h6>Adresa:</h6>
      <input type="text" value={adresa} onChange={handleAdresaChange} />
      {adresaError && <p style={{ color: 'red' }}>{adresaError}</p>}
      </div>
    </div>
  );
}

Adresa.propTypes={
  ime: PropTypes.string.isRequired,
  drzava: PropTypes.string.isRequired,
  adresa: PropTypes.string.isRequired,
  postaviIme: PropTypes.func.isRequired,
  postaviAdresu: PropTypes.func.isRequired,
  postaviDrzavu: PropTypes.func.isRequired,

}

export default Adresa;
