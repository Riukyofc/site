import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const isDark = true;

  useEffect(() => {
    localStorage.setItem('rky_theme', 'dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {}; // Toggling desativado para manter modo escuro fixo

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
