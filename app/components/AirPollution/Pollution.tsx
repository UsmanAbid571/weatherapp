"use client"
import React from 'react'
import { useGlobalContext } from '@/app/context/globalContext'
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { airQulaityIndexText } from '@/app/utils/Misc';
import { thermo } from '@/app/utils/Icons';

const Pollution = () => {
    const { pollution } = useGlobalContext();
    if(!pollution ||
        !pollution.list ||
        !pollution.list[0] ||
        !pollution.list[0].main){
        return <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full"/>    }

        const airQualityIndex = pollution.list[0].main.aqi * 10;

  const filteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div className=''>
       <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-zinc-900 shadow-sm dark:shadow-none col-span-full sm:col-span-2 md:col-span-2 xl:col-span-2"
    >
      <h2 className="flex items-center gap-2 font-medium">
        {thermo}Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">Air quality is {filteredIndex?.description}. </p>
    </div>
    </div>
  )
}

export default Pollution
