import React, {useEffect, useState} from "react";
import 'bulma/css/bulma.min.css';
import WeatherBoard from "./compontents/WeatherBoard/WeatherBoard";
import Header from "./compontents/Header/Header";
import axios from "axios";

function App() {
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState('33.580999,-85.075234') // 33.580999,-85.075234

  useEffect(() => {
    function getLocation() {
      const options = {
        method: 'GET',
        url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
        params: {format: 'json'},
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
          'x-rapidapi-host': 'ip-geo-location.p.rapidapi.com'
        }
      };
      axios.request(options).then((response) => {
        const city = response.data.city.name.toString();
        const state = response.data.area.code.toString();
        const latitude = response.data.location.latitude.toString();
        const longitude = response.data.location.longitude.toString();
        const userCoords = `${latitude},${longitude}`;
        const location = city + ', ' + state;
        setCoords(userCoords);
        setLocation(location);
      }).catch((error) => {
        console.error(error);
      })
    }
    getLocation();
  }, []);
  return (
    <>
    <Header location={ location }/>
    <div className="container">
      <WeatherBoard coords={coords}/>
    </div>
    </>
  );
}

export default App;
