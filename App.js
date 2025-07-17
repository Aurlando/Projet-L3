import * as React from 'react';
import Routes from './routes';
import SplashScreen from './screens/splashScreen';
import Home from './screens/Home';
import {useState,useEffect} from 'react';
import { ThemeProvider } from './hooks/useTheme';

export default function App() {
  const [showSplash,setshowSplash] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setshowSplash(false);
  }, 3000);
  });
  return (
    <ThemeProvider>
      {showSplash ? <SplashScreen /> : <Routes />}
    </ThemeProvider>
  );
}
