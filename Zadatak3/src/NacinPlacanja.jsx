import PropTypes  from "prop-types";
import "./App.css";


function Placanje({nacinPlacanja,postaviNacinPlacanja}) {
  const handleRadioChange = (event) => {
    postaviNacinPlacanja(event.target.value);
  };

  return (
    <div>
      <h5>Način plaćanja</h5>
      <div className="kontakt-container1">
      <div>
        <input 
          type="radio" 
          id="pouzecem" 
          name="nacinPlacanja" 
          value="pouzecem" 
          checked={nacinPlacanja === 'pouzecem'} 
          onChange={handleRadioChange} 
        />
        <label htmlFor="pouzecem">Plaćanje pouzećem</label>
      </div>
      <div>
        <input 
          type="radio" 
          id="karticom" 
          name="nacinPlacanja" 
          value="karticom" 
          checked={nacinPlacanja === 'karticom'} 
          onChange={handleRadioChange} 
        />
        <label htmlFor="karticom">Plaćanje karticom</label>
      </div>
     </div>
    </div>
  );
}

Placanje.propTypes={
  postaviNacinPlacanja: PropTypes.func.isRequired,
  nacinPlacanja: PropTypes.string.isRequired 
}

export default Placanje;
