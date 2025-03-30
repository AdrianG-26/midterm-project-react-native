import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useJobs } from "../context/JobContext";
import { useTheme } from "../context/ThemeContext";
import AppliedJobsScreen from "../screens/AppliedJobsScreen";
import SavedJobsScreen from "../screens/SavedJobsScreen";
import JobFinderStackNavigator from "./JobFinderStackNavigator"; // Import the stack navigator

export type StackParamList = {
  JobFinder:
    | {
        screen?: string;
        params?: any;
      }
    | undefined;
  SavedJobs: undefined;
  AppliedJobs: undefined;
};

const Tab = createBottomTabNavigator<StackParamList>();

const AppNavigator: React.FC = () => {
  const { theme, colors } = useTheme();
  const { savedJobs } = useJobs();

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
              iconName = "briefcase";
              return <Icon name={iconName} size={size} color={color} />;
            } else if (route.name === "SavedJobs") {
              iconName = "bookmark";
              return (
                <View style={styles.iconContainer}>
                  <Icon name={iconName} size={size} color={color} />
                  {savedJobs.length > 0 && (
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            theme === "dark" ? "#FF6B6B" : "#FF4949",
                        },
                      ]}
                    >
                      <Text style={styles.badgeText}>
                        {savedJobs.length > 99 ? "99+" : savedJobs.length}
                      </Text>
                    </View>
                  )}
                </View>
              );
            } else if (route.name === "AppliedJobs") {
              iconName = "checkmark-done";
              return <Icon name={iconName} size={size} color={color} />;
            } else {
              iconName = "help"; // Default icon name
              return <Icon name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor:
            theme === "dark" ? colors.text : colors.secondary,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.bottomNav,
            height: 70,
            paddingTop: 5,
            paddingBottom: 5,
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: -4 },
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
            paddingBottom: 4,
          },
        })}
      >
        <Tab.Screen
          name="JobFinder"
          component={JobFinderStackNavigator}
          options={{
            tabBarLabel: "Find Jobs",
          }}
        />
        <Tab.Screen
          name="SavedJobs"
          component={SavedJobsScreen}
          options={{
            tabBarLabel: "Saved",
          }}
        />
        <Tab.Screen
          name="AppliedJobs"
          component={AppliedJobsScreen}
          options={{
            tabBarLabel: "Applied",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default AppNavigator;
