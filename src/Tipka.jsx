import PropTypes from 'prop-types';
function Tipka(props){

    function handleClick(){
    // Pozivamo iz props-a
    props.akcija()
    }
   
    return(
    <div className="tipkaOkvir">
    <button onClick={handleClick}>{props.natpis}</button>
    </div>
    )
   }
   Tipka.propTypes={
     akcija: PropTypes.func.isRequired,
     natpis: PropTypes.string.isRequired

   }
   export default Tipka
   