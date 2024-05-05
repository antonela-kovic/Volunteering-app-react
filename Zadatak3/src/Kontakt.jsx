import  { useState } from 'react';
import PropTypes from "prop-types";
import "./App.css";


function Kontakt({kontakt,postaviKontakt}) {
    const [ispravanEmail, setIspravanEmail] = useState(true);

    const handleKontaktChange = (e) => {
        const newKontakt = e.target.value;
        postaviKontakt(newKontakt);
        setIspravanEmail(newKontakt.includes('@'));
    };

    return (
        <div>
            <h5>Kontakt</h5>
            <div className="kontakt-container">
            <label htmlFor="kontakt"></label>
            <input 
                type="text" 
                id="kontakt" 
                value={kontakt} 
                onChange={handleKontaktChange} 
                style={{ borderColor: ispravanEmail ? 'initial' : 'red' }} 
            />
            {!ispravanEmail && <p style={{ color: 'red' }}>Email adresa mora sadržavati znak &quot;@&quot;.</p>}
            </div>
        </div>
    );
}

Kontakt.propTypes={
    kontakt: PropTypes.string.isRequired,
    postaviKontakt: PropTypes.func.isRequired,
}

export default Kontakt;
