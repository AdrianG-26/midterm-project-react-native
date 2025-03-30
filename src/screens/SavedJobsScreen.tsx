import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import JobList from "../components/JobList";
import ThemeToggle from "../components/ThemeToggle";
import { useJobs } from "../context/JobContext";
import { useTheme } from "../context/ThemeContext";

const SavedJobsScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { savedJobs } = useJobs();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Header title="Saved Jobs" variant="savedJobs" />
      <JobList
        jobs={savedJobs}
        loading={false}
        showSaveButton={false}
        showRemoveButton={true}
      />
      <ThemeToggle />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SavedJobsScreen;
