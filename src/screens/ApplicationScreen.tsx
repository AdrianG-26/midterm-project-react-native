import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import ApplicationForm from '../components/ApplicationForm';

type ApplicationScreenRouteProp = RouteProp<StackParamList, 'Application'>;

interface ApplicationScreenProps {
  route: ApplicationScreenRouteProp;
}

const ApplicationScreen: React.FC<ApplicationScreenProps> = ({ route }) => {
  const { job, fromSavedJobs } = route.params;
  const { colors, theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Header title="Apply for Job" showBackButton />
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