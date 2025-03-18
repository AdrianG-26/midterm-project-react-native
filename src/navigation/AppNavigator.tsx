import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import JobFinderScreen from '../screens/JobFinderScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import { Job } from '../types/types';

export type StackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  Application: {
    job: Job;
    fromSavedJobs?: boolean;
  };
};

const Stack = createStackNavigator<StackParamList>();

const AppNavigator: React.FC = () => {
  const { theme, colors } = useTheme();

  // Custom navigation theme based on current app theme
  const navigationTheme = {
    ...(theme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      primary: colors.primary,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="JobFinder" component={JobFinderScreen} />
        <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
        <Stack.Screen name="Application" component={ApplicationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;