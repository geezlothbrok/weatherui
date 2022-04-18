import React, { useState } from "react";
import "./Weather.css";

const api = {
  key: "7a216d3c1a56e56e2423cb0c629c0173",
  base: "http://api.openweathermap.org/data/2.5/",
};

function WeatherDetails() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeather = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setCity("");
          console.log(result);
          setWeather(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "container warm"
            : "container"
          : "container"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}

        {weather.cod === "404" ? (
            <div className="not-avaliable-box">
          <p className="not-avaliable">
            City not found, Enter an avaliable city !
          </p
          ></div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default WeatherDetails;
