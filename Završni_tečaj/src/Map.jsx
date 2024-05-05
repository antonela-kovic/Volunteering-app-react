import { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import './ActivityList.css';
import PropTypes from 'prop-types';


const Map = ({ activity }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
  
    const mapStyles = {
      height: "400px",
      width: "100%"
    };
  
    const defaultCenter = {
      lat: parseFloat(activity.latitude), // Pretpostavljeno da su koordinate u objektu aktivnosti
      lng: parseFloat(activity.longitude)
    };
  
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter}
        >
          <Marker
            position={defaultCenter}
            onClick={() => setSelectedMarker(activity)}
          />
          {selectedMarker && (
            <InfoWindow
              position={defaultCenter}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>{selectedMarker.name}</h3>
                <p>{selectedMarker.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  };

  Map.propTypes = {
    activity: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  };

  export default Map;