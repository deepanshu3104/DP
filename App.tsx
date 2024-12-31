import React, { useEffect } from 'react'
import { LogBox, Text } from 'react-native';
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