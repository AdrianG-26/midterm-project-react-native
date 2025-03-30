import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import ApplicationScreen from "../screens/ApplicationScreen";
import JobFinderScreen from "../screens/JobFinderScreen";
import { Job } from "../types/types";

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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
        ...TransitionPresets.SlideFromRightIOS, 
      }}
    >
      <Stack.Screen name="JobFinderMain" component={JobFinderScreen} />
      <Stack.Screen
        name="Application"
        component={ApplicationScreen}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS, 
        }}
      />
    </Stack.Navigator>
  );
};

export default JobFinderStackNavigator;
