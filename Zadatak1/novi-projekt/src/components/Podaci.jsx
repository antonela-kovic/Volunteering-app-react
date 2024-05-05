import PropTypes from 'prop-types';
import "./Podaci.css";

function Pozdrav({datumRodenja,adresa,kontakt}) {
   
    return (
        <>  
           <h3>Opći podaci</h3>
           <hr/>
           <p>Datum rođenja: {datumRodenja}</p>
           <p>Adresa: {adresa}</p>
           <p>Kontakt: {kontakt}</p>
        </>
    )
}
Pozdrav.propTypes = {
    datumRodenja: PropTypes.string.isRequired, // Ovako npr. očekujemo string i da je obavezan bez ovoga ne radi
    adresa: PropTypes.string.isRequired,
    kontakt:PropTypes.string.isRequired,
};
  
export default Pozdrav