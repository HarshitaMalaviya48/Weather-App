import React, { useEffect, useRef, useState } from "react";
import styles from "./Weather.module.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import LoadingSpinner from "./LoadingSpinner";

const Weather = () => {
  const [weatherData, setWetaherData] = useState(false);
  const [loadState, setLoadState] = useState(true);
  const inputRef = useRef("");

  const icon_data = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please Enter city name...");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      //console.log(data);

      if (data.cod === "404") {
        alert("Error no : " + data.cod + "\n" + data.message);
        return;
      }

      const icon = icon_data[data.weather[0].icon] || clear_icon;
      setWetaherData({
        humidity: data.main.humidity,
        temperature: data.main.temp,
        city: data.name,
        windSpeed: data.wind.speed,
        icon: icon,
      });
      setLoadState(false);
    } catch (error) {}
  };

  useEffect(() => {
    search("New York");
  }, []);

  const handleSearchBtnClick = (e) => {
    search(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <>
      <div
        className={`${styles["weather"]} flex flex-col items-center p-[40px] bg-gradient-to-t from-[#2f4680] to-[#500ae4]`}
      >
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="rounded-3xl h-10 text-lg px-3 border-none  outline-none text-[#626262]"
            ref={inputRef}
            onKeyDown={(e) => {
              e.code === "Enter" ? handleSearchBtnClick() : null;
            }}
          />
          <div
            className="w-10 rounded-3xl border-none bg-[white] flex  items-center justify-center cursor-pointer"
            onClick={(e) => handleSearchBtnClick}
          >
            <i className="fa-solid fa-magnifying-glass  "></i>
          </div>
        </div>
        {loadState === true ? (
          <LoadingSpinner />
        ) : (
          <>
            <img src={weatherData.icon} alt="" className="w-[150px] my-3" />
            <div className="temp-city flex flex-col justify-center gap-2">
              <p className="text-6xl text-[#fff]">
                {weatherData.temperature}°C
              </p>
              <p className="text-[#fff] text-2xl self-center">
                {weatherData.city}
              </p>
            </div>

            <div className="flex justify-between w-[100%] mt-6">
              <div className="flex gap-2 items-center">
                <img src={humidity_icon} alt="" className="w-6 h-6" />
                <div className="text-[#fff]">
                  <p className="text-[22px]">{weatherData.humidity}%</p>
                  <p className="text-[16px]">Humidity</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <img src={wind_icon} alt="" className="w-6 h-6" />
                <div className="text-[#fff]">
                  <p className="text-[22px]">{weatherData.windSpeed} km/hr</p>
                  <p className="text-[16px]">Wind</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Weather;
