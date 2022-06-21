import React, { useState, useEffect } from "react";
import SearchWeather from "./SearchWeather";
import Container from "react-bootstrap/Container";

import WeatherCity from "./WeatherCity";

function App({ showResetButton }) {
  const [weather, setWeather] = useState(null);

  const [showGeoInfo, setShowGeoInfo] = useState(true);

  const API_KEY = "3d3b9b32aebc72e5e766753be6d6e4d5";

  const getWeatherData = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      });
  };

  const handleGetPositionError = () => {
    console.log("Error al obtener la geolocalizacion");
  };

  useEffect(initWeather, []);

  function initWeather() {
    navigator.geolocation.getCurrentPosition(
      getWeatherData,
      handleGetPositionError
    );
  }

  function getGeoInfo() {
    return showGeoInfo ? <WeatherCity city={weather}></WeatherCity> : <></>;
  }

  const reset = () => {
    setShowGeoInfo(true);
  };

  const handleSearch = () => {
    setShowGeoInfo(false);
  };

  return (
    <>
      <SearchWeather
        showSearchResult={!showGeoInfo}
        onSearch={handleSearch}
        onReset={reset}
      ></SearchWeather>

      <Container>{getGeoInfo()}</Container>
    </>
  );
}

export default App;
