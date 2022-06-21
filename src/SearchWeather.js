import React, { useState } from "react";

import WeatherCity from "./WeatherCity";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Swal from "sweetalert2";

const SearchWeather = ({
  removeGeoInfo,
  showSearchResult,
  onSearch,
  onReset,
}) => {
  const [cityName, setCityName] = useState("");
  const [dataCity, setDataCity] = useState([]);
  const [showReset, setShowReset] = useState(false);

  const [showDemo, setShowDemo] = useState(false);

  const API_KEY = "3d3b9b32aebc72e5e766753be6d6e4d5";

  function getLocation() {
    const url = `https://api.openweathermap.org/data/2.5/find?q=${cityName}&appid=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataCity(data.list);
      });
  }

  const handleInput = (event) => {
    setCityName(event.target.value);
  };

  const handleButton = () => {
    if (cityName.trim() === "") {
      Swal.fire({
        icon: "error",
        text: "You must enter the name of the city you want",
      });
    } else {
      getLocation();
      onSearch();
      setShowReset(true);
    }

    setCityName("");
  };

  const showWeatherData = () => {
    return showSearchResult ? (
      dataCity.map((city) => <WeatherCity city={city}></WeatherCity>)
    ) : (
      <></>
    );
  };

  const handleReset = () => {
    onReset();
    setShowReset(false);
  };

  const getShowResetButton = () => {
    return showReset ? (
      <Button variant="info" className="ml-2" onClick={handleReset}>
        Reset
      </Button>
    ) : (
      <></>
    );
  };

  const showButtonDemo = () => (showDemo ? <button>Demo</button> : <></>);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Weather App</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <input
            className="form-control"
            onChange={handleInput}
            value={cityName}
            placeholder="Enter City Name"
          ></input>
        </Col>
        <Col>
          <Button variant="info" onClick={handleButton}>
            Search
          </Button>
          {getShowResetButton()}
        </Col>
      </Row>
      <Row>
        <Col>
          {showWeatherData()}
          {showButtonDemo()}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchWeather;
