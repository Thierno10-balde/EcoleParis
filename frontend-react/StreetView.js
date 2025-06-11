// src/components/StreetView.jsx
import { GoogleMap, StreetViewPanorama, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const StreetView = ({ lat, lng }) => {
  const center = { lat, lng };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <StreetViewPanorama position={center} visible />
      </GoogleMap>
    </LoadScript>
  );
};

export default StreetView;
