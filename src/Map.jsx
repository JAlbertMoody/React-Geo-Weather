import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

function Map({setCoordinates}){

    // Initial map position
    const [position, setPosition] = useState([41.26, -95.93])

    // adding a visual marker to the location clicked on the map
    function AddMarkerToClick({ onClick }) {
        useMapEvents({
            click(event) {
            onClick(event);
            },
        });
    return null;
    }

    // set the position state to the location clicked
    function handleClick(event) {
        setPosition([event.latlng.lat, event.latlng.lng]);
        // this logic is to handle a bug where the map returns an invalid coordinate pair.
        // either way the coordinates are set and passed back to the <App /> components.
        if (event.latlng.lng <= (-180)) {
            const diff = event.latlng.lng - (-180);
            let newLng = (180 + diff);
            const newCoordinates = {
                lat: (event.latlng.lat).toFixed(4),
                lng: newLng.toFixed(4)
            };
            setCoordinates(newCoordinates);
          } else {
            const newCoordinates = {
                lat: (event.latlng.lat).toFixed(4),
                lng: (event.latlng.lng).toFixed(4)
            };
            setCoordinates(newCoordinates);
          }
    }

    return (
        <div className="Map">
            <MapContainer
                center={position}
                zoom={4}
                scrollWheelZoom={true}
                className="Map--container"
            >
                <TileLayer className='Map--tile'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AddMarkerToClick onClick={handleClick} />
                {position && (
                    <Marker position={position}>
                    <Popup>You clicked here</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}

export default Map;
