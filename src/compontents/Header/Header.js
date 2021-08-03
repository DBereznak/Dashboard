import React, { useState } from 'react';
import  moment from 'moment';
import './Header.scss';


function Header(props) {
    const [time, setTime] = useState(moment().format('LLLL'));

    setInterval(() => {
        setTime(moment().format('LLLL'));
    }, 60000);
    return (
        <header>
            <h1 className="is-size-3">Dashboard</h1>
            <div>
                <h2 className="is-size-3">{ props.location }</h2>
            </div>
            <div>
                <h2 className="is-size-3 mr-4">{ time }</h2>
            </div>
        </header>
    )
};

export default Header;