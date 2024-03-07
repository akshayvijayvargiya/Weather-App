import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Image, ImageBackground } from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {theme} from '../theme'
import { MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import  {MapPinIcon, CalendarDaysIcon} from 'react-native-heroicons/solid'
import {debounce} from 'lodash';
import { fetchLocations, fetchWeatherForecast } from "../api/weather";

export default function HomeScreen() {
    const [showSearch, toggleSearch] = useState(false);
    const [locations, setlocations] = useState([]);
    const [weather, setWeather] = useState({});

    const handleLocation = (loc) => {
        console.log("location: " , loc)
        setlocations([]);
        toggleSearch(false);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }). then(data=> {
            setWeather(data);
            console.log("ForecastData: ", data)
        })
    }

const handleSearch = value => {
    //fetch locatiojns API call
    if(value.length>2){
        fetchLocations({cityName: value}).then(data=>{
            setlocations(data);
            console.log("Got locations: ", data)
        })
    }
    
}
const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);
const {current, location} = weather;
//const localTime = location?.localtime.split(" "); // Using space as the delimiter


    return(
        <View className="flex-1 relative">
            <StatusBar style="light" />
            <Image blurRadius={20} source={require('../assets/bg.jpg')}
                className="absolute h-full w-full" 
            />
            <SafeAreaView className="flex flex-1">
            
                <View style={{height: '7%'}} className="mx-4 relative z-50">
                        <View className="flex-row justify-end items-center rounded-full" style={{backgroundColor: showSearch? theme.bgWhite(0.2): 'transparent'}}>
                            {
                                showSearch? ( 
                                <TextInput 
                                onChangeText={handleTextDebounce}
                                placeholder='Search City' 
                                placeholderTextColor={'lightgray'} 
                                className="pl-6 h-10 pb-1 flex-1 text-base text-white" />)
                                :null
                            }
                           
                           <TouchableOpacity
                           onPress={()=> toggleSearch(!showSearch)}
                           style={{backgroundColor: theme.bgWhite(0.3)}}
                           className= "rounded-full p-3 m-1">
                            <MagnifyingGlassIcon size="25" color="white" />
                           </TouchableOpacity>
                        </View>
{
    locations.length>0 && showSearch? (
<View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
  {  locations.map((loc, index) => {
    let showBorder = index+1 != locations.length;
    let borderClass = showBorder? 'border-b-2 border-b-gray-400' : ' ';
    return (
        <TouchableOpacity
        onPress={() => handleLocation(loc)}
        key = {index}
        className= {"flex-row items-center border-0 p-3 px-4 mb-1 "+borderClass}
        >
            <MapPinIcon size="20" color="gray"></MapPinIcon>
            <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
        </TouchableOpacity>
    )
  })
}
</View>

    ) : null
}
                </View>

                <View className = "mx-4 flex justify-around flex-1 mb-2">
                    <Text className="text-white text-center text-2xl font-bold">{location?.name}, {location?.country}</Text>
                    <View className="flex-row justify-center">
                        <Image 
                        //source = {weatherImages[currect?.condition?.text]}
                        source={require('../assets/cloudy.png')} 
                        className= "w-52 h-52"/>
                    </View>
                    <View className= "space-y-2">
                        <Text className= "text-center font-bold text-white text-6xl ml-5">
                            {current?.temp_c}&#176;
                        </Text>
                        <Text className= "text-center font-bold text-white text-xl ml-5">
                        {current?.condition?.text}
                        </Text>

                    </View>

                    <View className="flex-row justify-between mx-4">

                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/wind.png')} className="h-8 w-8" />
                            <Text className="text-white font-semibold text-base">{current?.wind_mph}</Text>
                        </View>

                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/drop.png')} className="h-8 w-8" />
                            <Text className="text-white font-semibold text-base">{current?.humidity}</Text>
                        </View>

                        <View className="flex-row space-x-2 items-center">
                            <Image source={require('../assets/sun.png')} className="h-8 w-8" />
                            <Text className="text-white font-semibold text-base">6:00 AM</Text>
                        </View>
                    </View>


                </View>

                <View className="mb-2 space-y-3">
                    <View className="flex-row items-center mx-5 space-x-2">
                        <CalendarDaysIcon size="22" color="white"></CalendarDaysIcon>
                        <Text className="text-white text-base">Daily Forecast</Text>
                    </View>

                    <ScrollView
                    horizontal
                    contentContainerStyle= {{paddingHorizontal: 15}}
                    showsHorizontalScrollIndicator = {false}>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/rain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">16&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/rain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">16&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/rain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">16&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/rain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">16&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/rain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">16&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/rain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">16&#176;</Text>
                        </View>
                        <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                        style={{backgroundColor: theme.bgWhite(0.15)}}>
                            <Image source={require('../assets/rain.png')} className="h-11 w-11" />
                            <Text className="text-white">Monday</Text>
                            <Text className="text-white text-xl font-semibold">16&#176;</Text>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}