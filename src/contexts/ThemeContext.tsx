import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isAccessibilityMode: boolean;
  toggleAccessibility: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  const [isAccessibilityMode, setIsAccessibilityMode] = useState(() => {
    const saved = localStorage.getItem('accessibility');
    return saved === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isAccessibilityMode) {
      document.documentElement.classList.add('accessibility-mode');
      localStorage.setItem('accessibility', 'true');
    } else {
      document.documentElement.classList.remove('accessibility-mode');
      localStorage.setItem('accessibility', 'false');
    }
  }, [isAccessibilityMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleAccessibility = () => {
    setIsAccessibilityMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isAccessibilityMode, toggleAccessibility }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
