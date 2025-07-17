import { useState, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Default theme is now 'dark'
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 