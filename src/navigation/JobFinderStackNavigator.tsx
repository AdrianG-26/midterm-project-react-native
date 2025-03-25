import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobFinderScreen from '../screens/JobFinderScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import { Job } from '../types/types';

export type JobFinderStackParamList = {
  JobFinderMain: undefined;
  Application: {
    job: Job;
    fromSavedJobs?: boolean;
  };
};

const Stack = createStackNavigator<JobFinderStackParamList>();

const JobFinderStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JobFinderMain" component={JobFinderScreen} />
      <Stack.Screen name="Application" component={ApplicationScreen} />
    </Stack.Navigator>
  );
};

export default JobFinderStackNavigator;