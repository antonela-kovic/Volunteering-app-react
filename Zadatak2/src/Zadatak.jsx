import PropTypes from 'prop-types'; 

function Zadatak(props) {
    if (props.gotov) {
    return <p>{props.natpis} ✅</p>;
    }
    return <p>{props.natpis} 🕓🔄</p>;
   }

   Zadatak.propTypes = {
    gotov: PropTypes.bool.isRequired, // Validate 'gotov' prop as a required boolean
    natpis: PropTypes.string.isRequired // Validate 'natpis' prop as a required string
  };
export default Zadatak;
   