import { RouteProp } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import ApplicationForm from "../components/ApplicationForm";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";
import { JobFinderStackParamList } from "../navigation/JobFinderStackNavigator";

type ApplicationScreenRouteProp = RouteProp<
  JobFinderStackParamList,
  "Application"
>;

interface ApplicationScreenProps {
  route: ApplicationScreenRouteProp;
}

const ApplicationScreen: React.FC<ApplicationScreenProps> = ({ route }) => {
  const { job, fromSavedJobs } = route.params;
  const { colors, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Header title="Apply for Job" showBackButton variant="default" />
      <ApplicationForm job={job} fromSavedJobs={fromSavedJobs} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ApplicationScreen;
