"use Client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";
import { debounce } from 'lodash'

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  // States
  const [forecast, setForecast] = useState({});
  const [pollution, setPollution] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([
    33.7104, 73.1338,
  ]);


  // Fetch current Weather
  const fetchForecast = async (lat, lon) => {
    try {
      
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
     
      setForecast(res.data);
      
    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };


  // Fetch Air Pollution Data
  const airPollution = async (lat,lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);

      setPollution(res.data);
      
    } catch (error) {
      console.log("Error fetching Air Pollution data: ", error.message);
    }
  };


  // Fetch Geo Code
  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    airPollution(activeCityCoords[0], activeCityCoords[1]);

  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        pollution,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider value={{setActiveCityCoords}}>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);