import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../context/ThemeContext";
import AppliedJobsScreen from "../screens/AppliedJobsScreen";
import SavedJobsScreen from "../screens/SavedJobsScreen";
import JobFinderStackNavigator from "./JobFinderStackNavigator"; // Import the stack navigator

export type StackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  AppliedJobs: undefined;
};

const Tab = createBottomTabNavigator<StackParamList>();

const AppNavigator: React.FC = () => {
  const { theme, colors } = useTheme();

  // Custom navigation theme based on current app theme
  const navigationTheme = {
    ...(theme === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      primary: colors.primary,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === "JobFinder") {
              iconName = "briefcase-outline";
            } else if (route.name === "SavedJobs") {
              iconName = "bookmark-outline";
            } else if (route.name === "AppliedJobs") {
              iconName = "checkmark-done-outline";
            } else {
              iconName = "help-outline"; // Default icon name
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="JobFinder" component={JobFinderStackNavigator} />
        <Tab.Screen name="SavedJobs" component={SavedJobsScreen} />
        <Tab.Screen name="AppliedJobs" component={AppliedJobsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;