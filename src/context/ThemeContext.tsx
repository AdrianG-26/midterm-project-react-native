import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { ThemeType } from "../types/types";

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
    border: string;
    error: string;
    accent: string;
    header: string;
    bottomNav: string;
  };
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize theme based on system preference
  const [theme, setTheme] = useState<ThemeType>(
    Appearance.getColorScheme() === "dark" ? "dark" : "light"
  );

  // Update theme when system preference changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? "dark" : "light");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const lightColors = {
    background: "#F6F5F5",
    text: "#2A2A2A",
    primary: "#4C145F",
    secondary: "#6C757D",
    card: "#FFFFFF",
    border: "#DEE2E6",
    error: "#DC3545",
    accent: "#F6F5F5",
    header: "#F6F5F5",
    bottomNav: "#FFFFFF",
  };

  const darkColors = {
    background: "#2A2A2A",
    text: "#F6F5F5",
    primary: "#E9F443",
    secondary: "#ADB5BD",
    card: "#1a1a1a",
    border: "#343A40",
    error: "#E74C3C",
    accent: "#E9F443",
    header: "#2A2A2A",
    bottomNav: "#1a1a1a",
  };

  const colors = theme === "light" ? lightColors : darkColors;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
