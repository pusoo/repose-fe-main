// import React from 'react'
import React, { useState } from 'react';
import Calendar from 'react-calendar';   
import 'react-calendar/dist/Calendar.css'; 
import '../assets/calendar.css'

const CalendarView = () => {
    const [date, setDate] = useState(new Date());
  return (
    <div className='calendar-container'>
        <Calendar 
        calendarType="US" 
        className="calendar" 
        onChange={setDate} 
        value={date} />
    </div>
  )
}

export default CalendarView
