import PropTypes from 'prop-types';
function Sažetak({ ime, drzava, adresa, kontakt, nacinPlacanja }) {
  return (
    <div>
      <h2>Sažetak narudžbe</h2>
      <p><strong>Ime:</strong> {ime}</p>
      <p><strong>Država:</strong> {drzava}</p>
      <p><strong>Adresa:</strong> {adresa}</p>
      <p><strong>Kontakt:</strong> {kontakt}</p>
      <p><strong>Način plaćanja:</strong> {nacinPlacanja}</p>
    </div>
  );
}

Sažetak.propTypes={
  kontakt: PropTypes.string.isRequired,
  nacinPlacanja: PropTypes.string.isRequired,
  ime: PropTypes.string.isRequired,
  drzava: PropTypes.string.isRequired,
  adresa: PropTypes.string.isRequired

}

export default Sažetak;
