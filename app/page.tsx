import Image from "next/image";
import Temperature from "./components/Temperature/Temperature";
import Pollution from "./components/AirPollution/Pollution";
import Humidity from "./components/Humidity/Humidity";
import Sunset from "./components/Sunset/Sunset";
import Wind from "./components/Wind/Wind"
import FeelsLike from "./components/FeelsLike/Feels_Like";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
    <div className="pb-4 flex flex-col gap-4 md:flex-row">
      <div className="flex flex-col gap-4 w-[18rem] min-w-[18rem] md:w-[35rem]">
        <Temperature />
      </div>
      <div className="flex flex-col">
      <div className="instruments grid h-full gap-4 col-span-full sm:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <Pollution />
            <Humidity/>
            <Sunset/>
            <Wind/>
            <FeelsLike/>
          </div>
      </div>
    </div>
  </main>
  );
}
