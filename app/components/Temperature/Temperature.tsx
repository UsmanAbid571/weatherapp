"use client"
//import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import { KelvinToCelsius } from '@/app/utils/Misc';
import moment from "moment";

function Temperature() {
    const { forecast } = useGlobalContext();
    const { main, name, weather, timezone } = forecast;

    if (!forecast || !weather) {
        return <div>Loading...</div>;
    }
    
    // const [localTime, setLocalTime] = useState("");
    // const [currentDay, setCurrentDay] = useState("")

    const minTemp = KelvinToCelsius(main?.temp_min);
    const maxTemp = KelvinToCelsius(main?.temp_max);
    const Temp = KelvinToCelsius(main?.temp);
   
    // useEffect(() => {
        
    //     const interval = setInterval(() => {
             
            

    //       const localMoment = moment().utcOffset(timezone *1000 );
          
    //       const formatedTime = localMoment.format("HH:mm:ss:A");
          
    //       const day = localMoment.format("dddd");
    
    //       setLocalTime(formatedTime);
    //       setCurrentDay(day);
    //     }, 1000);
    //   }, []);
    
    return (
        <div className='border p-5 rounded-lg flex flex-col justify-between dark:bg-zinc-900 shadow-sm dark:shadow-none '>
            <p className='flex justify-between items-center'>
                <span className='font-medium'></span>
                <span className='font-medium'></span>
            </p>
            <p className='pt-2 font-bold
      flex gap-1'>
                <span>{name}</span>
                <span></span>
            </p>
            <p className='py-10 text-8xl font-bold self-center  '>
                {Temp}°C
            </p>
            <p className='capitalize text-lg font-medium pt-2'></p>
            <p className='flex gap-2 items-center'>
                <span>Low: {minTemp}°C</span>
                <span>High: {maxTemp}°C</span>
            </p>

        </div>
    )
}

export default Temperature
