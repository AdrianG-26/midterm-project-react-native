import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { JobProvider } from "./src/context/JobContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <JobProvider>
          <AppNavigator />
        </JobProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
