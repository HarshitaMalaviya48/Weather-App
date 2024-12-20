import React from 'react'
import './App.css';
import Weather from './components/Weather';
import DateAndTime from './components/DateAndTime';

const App = () => {
  return (
    <div className='app'>
      <Weather></Weather>
      <DateAndTime></DateAndTime>
    </div>
  )
}

export default App
