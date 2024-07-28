"use client"
import React from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import { Skeleton } from '@/components/ui/skeleton';
import { KelvinToCelsius } from '@/app/utils/Misc';
import { thermo } from '@/app/utils/Icons';

const FeelsLike = () => {
    const {forecast} = useGlobalContext();

    if(!forecast || !forecast?.main || !forecast?.main?.feels_like){
        return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full"/>
    }

    const { feels_like, temp_max, temp_min} = forecast?.main;

    const feelsLikeText = (
      feelsLike: number,
      minTemo: number,
      maxTemp: number
    ) => {
      const avgTemp = (minTemo + maxTemp) / 2;
  
      if (feelsLike < avgTemp - 5) {
        return "Feels significantly colder than actual temperature.";
      }
      if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
        return "Feels close to the actual temperature.";
      }
      if (feelsLike > avgTemp + 5) {
        return "Feels significantly warmer than actual temperature.";
      }
  
      return "Temperature feeling is typical for this range.";
    };
  
    const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

    
  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermo} Feels Like
        </h2>
        <p className="pt-4 text-2xl">{KelvinToCelsius(feels_like)}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  )
}

export default FeelsLike
