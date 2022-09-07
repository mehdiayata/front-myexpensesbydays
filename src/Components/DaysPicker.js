import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const DaysPicker = (props) => {
    const {daysArray} = props;
    const {setDaysArray} = props;
    const [daysInterval, setDaysInterval] = useState([1, 28]);
    const [displayDate, setDisplayDate] = useState([]);

    useEffect(() => {
        for (let i = daysInterval[0]; i < daysInterval[1] + 1; i++) {
            displayDate.push(i);
        }

    }, [])

    const addDaysInArray = (days) => {
        setDaysArray([...daysArray, days]);
    }

    return (
        <div className='days-picker'>
            <input type="text" />

            {displayDate.map((days) => {
                return (
                    <Button className="date-picker-button" key={days} onClick={() => {addDaysInArray(days)}}>
                        {days}
                    </Button>
            )
            })
            }
        </div>
    );
};

export default DaysPicker;