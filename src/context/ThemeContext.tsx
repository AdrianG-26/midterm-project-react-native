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
    background: "#F8F9FA",
    text: "#212529",
    primary: "#007BFF",
    secondary: "#6C757D",
    card: "#FFFFFF",
    border: "#DEE2E6",
    error: "#DC3545",
  };

  const darkColors = {
    background: "#121212",
    text: "#F8F9FA",
    primary: "#0D6EFD",
    secondary: "#ADB5BD",
    card: "#1E1E1E",
    border: "#343A40",
    error: "#E74C3C",
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
