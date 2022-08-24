import { useState } from "react";
import { dateBuilder } from "./helpers/dateBuilder";

const api = {
  key: "5e1300e5dcd8dc5668bbaf9b75329969",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      // Si el evento de teclado es enter... se ejecuta el fetch segun lo escrito
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        // Se toma la base de la api y se le concatena weather? + el query (q=) junto a lo que se escribio en la barra de busqueda, a esto se le añade el tipo de unidades y la api key al final para que se realize la peticion correctamente.
        .then((res) => res.json())

        // Una vez cumplida la promesa la res me va a devolver un json con la info.
        .then((result) => {
          setWeather(result);

          // Y luego la resolucion de eso va a establecer el estado de setWeather. (Lo que se ve en pantalla).
          setQuery("");

          // Este setQuery hace que se resetee el formulario una vez buscado algo.
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
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
      </main>
    </div>
  );
};

// Notas

//Math.round() es para que los grados aparezcan como numeros enteros
