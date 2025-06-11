// frontend/src/components/SchoolMap.jsx

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function SchoolMap({ schools }) {
  const defaultPosition = [48.8566, 2.3522]; // Paris center

  return (
    <MapContainer center={defaultPosition} zoom={12} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {schools.map((school) => (
        <Marker
          key={school.id}
          position={[school.coordinates.coordinates[1], school.coordinates.coordinates[0]]}
          icon={customIcon}
        >
          <Popup>
            <strong>{school.name}</strong><br />
            {school.address}<br />
            {school.arr}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
