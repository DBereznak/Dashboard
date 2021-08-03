import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherBoard.scss';

function WeatherBoard(props) {
    const [narrative, setNarrative] = useState([]);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [highTemps, setHighTemps] = useState([]);
        useEffect(() => {
            function getWeather(){
                const options = {
                    method: 'GET',
                    url: 'https://weather-com.p.rapidapi.com/v3/wx/forecast/daily/3day',
                    params: {geocode: props.coords, units: 'e', language: 'en'},
                    headers: {
                        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
                        'x-rapidapi-host': 'weather-com.p.rapidapi.com'
                    }
                };

                axios.request(options).then(response => {
                    setNarrative(response.data.narrative);
                    setDaysOfWeek(response.data.dayOfWeek);
                    setHighTemps(response.data.calendarDayTemperatureMax);
                }).catch((error) => {
                    console.error(error);
                })
            }
            getWeather();
        }, []);

    return (
        <div className="pane">
            <h3 className="is-size-3 has-text-centered">Weatherboard</h3>

            <table>
                <thead>
                <tr>
                    {daysOfWeek.map((day, index) => {
                        return (
                            <th key={index} className="is-size-4 pb-4">{ day }</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {narrative.map((text, index) => {
                        return (
                            <td key={index} className="has-text-left">
                                <p className="mr-3 ml-0 is-size-5">{ text }</p>
                            </td>
                        )
                    })
                    }
                </tr>
                <tr>
                    {highTemps.map((temp, index) => {
                        return (
                            <td key={index} className="is-size-4 is-uppercase">
                                high: { temp } <span className="is-size-7 temp">&#8457;</span>
                            </td>
                        )
                    })
                    }
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default WeatherBoard;