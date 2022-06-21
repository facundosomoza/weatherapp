import React from "react";

const WeatherCity = ({ city }) => {
  return city ? (
    <>
      <ul
        className="py-3"
        style={{ listStyle: "none", border: "1px solid gray" }}
      >
        <li>
          <img
            src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
          />
        </li>
        <li>Country: {city.sys.country}</li>
        <li>City: {city.name}</li>
        <li>Feels Like: {city.main.feels_like}</li>
        <li>Humedity: {city.main.humidity}</li>
        <li>Pressure: {city.main.pressure}</li>
        <li>Temp: {city.main.temp}</li>
        <li>Temp. Max: {city.main.temp_max}</li>
        <li>Temp. Min:{city.main.temp_min}</li>
      </ul>
    </>
  ) : (
    console.log("no esta la info")
  );
};

export default WeatherCity;
