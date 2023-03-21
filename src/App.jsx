import React, { useState } from 'react';
import Map from './Map';
import Weather from './Weather';

function App() {

  // initialize state so that both components can render without errors
  const [coordinates, setCoordinates] = useState({lat: 41.26, lng: -95.93});

  function Header(){
    return (
      <h1>Click the map to get geo-specific weather data!</h1>
    )
  }

  // it's very important here to pass the state to the <Map /> and
  // <Weather /> components as they are dependent on each other. 
  return (
    <main>
      <Header />
      <Map setCoordinates={setCoordinates}/>
      <Weather coordinates={coordinates}/>
    </main>
  );
}

export default App;
