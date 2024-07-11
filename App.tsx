import React from 'react'
import {LogBox} from 'react-native';
import Stack from './src/routes/Stack'
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
     <Stack />
    </>
  )
}

export default App