import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import JobList from "../components/JobList";
import ThemeToggle from "../components/ThemeToggle";
import { useJobs } from "../context/JobContext";
import { useTheme } from "../context/ThemeContext";

const AppliedJobsScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { applications, jobs } = useJobs();

  // Filter jobs that have been applied for
  const appliedJobs = jobs.filter((job) =>
    applications.some((app) => app.jobId === job.id)
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Header title="Applied Jobs" variant="appliedJobs" />
      <JobList
        jobs={appliedJobs}
        loading={false}
        showSaveButton={false}
        showRemoveButton={false}
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

export default AppliedJobsScreen;
