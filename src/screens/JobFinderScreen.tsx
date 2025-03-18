import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobContext';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';
import Header from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';

const JobFinderScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { filteredJobs, loading, refreshJobs } = useJobs();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Header title="Job Finder" />
      <SearchBar />
      <JobList
        jobs={filteredJobs}
        loading={loading}
        onRefresh={refreshJobs}
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

export default JobFinderScreen;