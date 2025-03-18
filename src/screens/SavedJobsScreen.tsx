import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobContext';
import JobList from '../components/JobList';
import Header from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';

const SavedJobsScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { savedJobs } = useJobs();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Header title="Saved Jobs" showBackButton />
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