import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import JobList from "../components/JobList";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import { useJobs } from "../context/JobContext";
import { useTheme } from "../context/ThemeContext";
import { StackParamList } from "../navigation/AppNavigator";

const JobFinderScreen: React.FC = () => {
  const { colors, theme } = useTheme();
  const { filteredJobs, loading, refreshJobs } = useJobs();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Header title="Job Hunter" variant="jobFinder" />
      <SearchBar />
      <JobList jobs={filteredJobs} loading={loading} onRefresh={refreshJobs} />
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
