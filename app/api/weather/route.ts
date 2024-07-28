import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
    try {
       const Apikey = process.env.OPEN_WEATHER_API_KEY
       const searchParams = req.nextUrl.searchParams;

       const lat = searchParams.get("lat");
       const lon = searchParams.get("lon");
       const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Apikey}`

       const response = await axios.get(ApiUrl)
       

       return NextResponse.json(response.data)
    } catch (error) {
        console.log("Some Error Occured",error)
    }
}