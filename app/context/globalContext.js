"use Client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  // States
  const [forecast, setForecast] = useState({});
  const [pollution, setPollution] = useState({});


  // Fetch current Weather
  const fetchForecast = async () => {
    try {
      
      const res = await axios.get("api/weather");
     
      setForecast(res.data);
      
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };


  // Fetch Air Pollution Data
  const airPollution = async () => {
    try {
      const res = await axios.get("api/pollution");

      setPollution(res.data);
      
    } catch (error) {
      console.log("Error fetching Air Pollution data: ", error.message);
    }
  };

  useEffect(() => {
    fetchForecast();
    airPollution();

  }, []);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        pollution,
      }}
    >
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);