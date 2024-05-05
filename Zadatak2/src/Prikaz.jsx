import PropTypes from 'prop-types';
function Prikaz(props) {
    return (
    <div className="prikazBroja">
    <p>{props.broj}</p>
    </div>
    );
   }
   
   Prikaz.propTypes={
     broj: PropTypes.number.isRequired
   };
   export default Prikaz;
   