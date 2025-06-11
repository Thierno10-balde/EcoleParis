import StreetView from './StreetView';

<Popup>
  <h4>{school.name}</h4>
  <p>{school.address}</p>
  <StreetView lat={school.coordinates[1]} lng={school.coordinates[0]} />
</Popup>
