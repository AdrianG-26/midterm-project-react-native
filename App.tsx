import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { LogBox, Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { JobProvider } from "./src/context/JobContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";

// Ignore specific warnings that might be related to font loading
LogBox.ignoreLogs(["Overwriting fontFamily style attribute preprocessor"]);

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // We'll add font loading back when the font files are properly set up
        // For now, we'll just use system fonts

        // Add a small delay to ensure splash screen displays properly
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (e) {
        console.warn("Error during app initialization:", e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <ThemeProvider>
          <JobProvider>
            <AppNavigator />
          </JobProvider>
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
