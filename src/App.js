import React, { useState } from "react";
import "./App.css";

const api = {
  key: "85c42e2ef90eecb87cb1bedd07986f73",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const SearchWeather = (e) => {
    e.preventDefault();
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
      });
  };

  const dateBuilder = (d) => {
    let months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "octomber",
      "novermber",
      "december",
    ];
    let days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <form
        className="app__form"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onSubmit={SearchWeather}
      >
        <input
          type="text"
          className="app__input"
          placeholder="Enter City Name"
        />

        {typeof weather.main != "undefined" ? (
          <div className="weather">
            <h1>
              {weather.name},{weather.sys.country}
            </h1>
            <h4>{dateBuilder(new Date())}</h4>

            <h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              {weather.main.temp}°C
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
            </h2>
            <small>{weather.weather[0].main}</small>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default App;
