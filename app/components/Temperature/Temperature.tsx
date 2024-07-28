"use client"
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import { KelvinToCelsius } from '@/app/utils/Misc';
import { sun,cloud,rain, snow, mist, thunderstorm, scatteredClouds,drizzle } from '@/app/utils/Icons'
import moment from "moment";

function Temperature() {
    const { forecast } = useGlobalContext();
    const { main, name, weather, timezone } = forecast;
    const [localTime, setLocalTime] = useState("");
    const [currentDay, setCurrentDay] = useState("")

    useEffect(() => {
        
      const interval = setInterval(() => {
           
          

        const localMoment = moment().utcOffset(timezone / 60 );
        
        const formatedTime = localMoment.format("hh:mm:ss A");
        
        const day = localMoment.format("dddd");
  
        setLocalTime(formatedTime);
        setCurrentDay(day);
      }, 1000);
      return () => clearInterval(interval);
    }, [timezone]);

    if (!forecast || !weather ) {
        return <div>Loading...</div>;
    }
    
   

    const minTemp = KelvinToCelsius(main?.temp_min);
    const maxTemp = KelvinToCelsius(main?.temp_max);
    const Temp = KelvinToCelsius(main?.temp);
    const {main: weatherMain , description} = weather[0];
    console.log(description)
    const getIcon = () => {
        switch (weatherMain) {
          case "Drizzle":
            return drizzle;
          case "Rain":
            return rain;
          case "Snow":
            return snow;
          case "Clear":
            return sun;
          case "Clouds":
            return scatteredClouds;
            case "Thunderstorm":
                return thunderstorm;
          default:
            return sun;
        }
      };
    
    
    return (
        <div className='border p-5 rounded-lg flex flex-col justify-between shadow-sm dark:shadow-none '>
            <p className='flex justify-between items-center'>
                <span className='font-medium'>{currentDay}</span>
                <span className='font-medium'>{localTime}</span>
            </p>
            <p className='pt-2 font-bold
      flex gap-1'>
                <span>{name}</span>
                <span></span>
            </p>
            <p className='py-10 text-8xl font-bold self-center  '>
                {Temp}°C
            </p>
            <p className='mt-2  mx-2'>{getIcon()}</p>
            <p className='capitalize text-lg font-medium pt-2'>{description}</p>
            <p className='flex gap-2 items-center'>
                <span>Low: {minTemp}°C</span>
                <span>High: {maxTemp}°C</span>
            </p>

        </div>
    )
}

export default Temperature
