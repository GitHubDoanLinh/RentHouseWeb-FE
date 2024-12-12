import axios from "axios";
import {useEffect, useState} from "react";
import ImaIcon from '../extension/img/sun.png';
import ImaIcon1 from '../extension/img/mayit.png'
import ImaIcon2 from '../extension/img/maynhieu.png'
import ImaIcon3 from '../extension/img/muanho.png'
import ImaIcon4 from '../extension/img/muavua.png'
import ImaIcon5 from '../extension/img/muatuyet.png'
const Weather = () => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        const fetchWeather = async (latitude, longitude) => {
            try {
                const apiKey = '65d7703f8b989293cd09951d49f3b2e1';
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`
                );
                setWeather(() => {
                    return {
                        temperature: response.data.main.temp,
                        city: response.data.name,
                        icon: response.data.weather[0].icon,
                    };
                });
            } catch (error) {
                console.error('Error fetching weather:', error.message);
            }
        };
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        fetchWeather(latitude, longitude).then();
                    },
                    (error) => {
                        console.error('Error getting location:', error.message);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };
        getLocation();
    }, []);
    return (
        <div className="weather-small text-white">
            <p className="current-weather">
                {weather ? (
                    <>
                        {weather.icon === '01d' ? (
                            <img alt={''} src={ImaIcon}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : weather.icon === '01n' ? (
                            <i className='bx bx-moon'></i>
                        ) : weather.icon === '02d' || weather.icon === '02n' ? (
                            <img alt={''} src={ImaIcon1}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : weather.icon === '03d' || weather.icon === '03n' ? (
                            <img alt={''} src={ImaIcon2}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : weather.icon === '04d' || weather.icon === '04n' ? (
                            <img alt={''} src={ImaIcon}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : weather.icon === '09d' || weather.icon === '09n' ? (
                            <img alt={''} src={ImaIcon3}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : weather.icon === '10d' || weather.icon === '10n' ? (
                            <img alt={''} src={ImaIcon4}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : weather.icon === '13d' || weather.icon === '13n' ? (
                            <img alt={''} src={ImaIcon5}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : weather.icon === '50d' || weather.icon === '50n' ? (
                            <img alt={''} src={ImaIcon}
                                 style={{height: '40px', width: '40px', marginRight: '12px'}}/>
                        ) : (
                            <i className='bx bx-question-mark'></i>
                        )}
                        <span>{weather.temperature}°C</span>
                    </>
                ) : (
                    'Loading...'
                )}
            </p>
            <p className="weather-city">{weather ? weather.city.toUpperCase() : 'Loading...'}</p>
        </div>
    )
}
export default Weather;