import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherBoard.scss';

function WeatherBoard() {
    const [narrative, setNarrative] = useState([]);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [highTemps, setHighTemps] = useState([]);

        const options = {
            method: 'GET',
            url: 'https://weather-com.p.rapidapi.com/v3/wx/forecast/daily/3day',
            params: {geocode: '33.580999,-85.075234', units: 'e', language: 'en'},
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_WEATHER_API_KEY,
                'x-rapidapi-host': 'weather-com.p.rapidapi.com'
            }
        };
        useEffect(() => {
            let loaded = true;
            axios.request(options).then(response => {
                if(loaded) {
                    setNarrative(response.data.narrative);
                    setDaysOfWeek(response.data.dayOfWeek);
                    setHighTemps(response.data.calendarDayTemperatureMax);
                }
            }).catch((error) => {
                console.error(error);
            })
            return () => loaded = false;
        }, [])

    return (
        <div className="pane">
            <h3>Weatherboard</h3>
            <table>
                <tr>
                    {daysOfWeek.map(day => {
                        return (
                            <th>{ day }</th>
                        )
                    })}
                </tr>
                <tr>
                    {narrative.map(text => {
                        return (
                            <td>
                                { text }
                            </td>
                        )
                    })
                    }
                </tr>
                <tr>
                    {highTemps.map(temp => {
                        return (
                            <td>
                                high: { temp } &#8457;
                            </td>
                        )
                    })
                    }
                </tr>
            </table>

        </div>
    )
}

export default WeatherBoard;