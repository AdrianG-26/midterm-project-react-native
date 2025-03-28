import React from 'react';
import { FlatList, Text, View, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { Job } from '../types/types';
import JobCard from './JobCard';
import { useTheme } from '../context/ThemeContext';

interface JobListProps {
  jobs: Job[];
  loading: boolean;
  onRefresh?: () => void;
  showSaveButton?: boolean;
  showRemoveButton?: boolean;
}

const JobList: React.FC<JobListProps> = ({
  jobs,
  loading,
  onRefresh,
  showSaveButton = true,
  showRemoveButton = false,
}) => {
  const { colors } = useTheme();

  const renderEmptyList = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.emptyText, { color: colors.secondary }]}>Loading jobs...</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text }]}>No jobs found</Text>
        <Text style={[styles.emptySubtext, { color: colors.secondary }]}>
          Try adjusting your search criteria
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <JobCard 
          job={item} 
          showSaveButton={showSaveButton}
          showRemoveButton={showRemoveButton}
        />
      )}
      ListEmptyComponent={renderEmptyList}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        ) : undefined
      }
      contentContainerStyle={jobs.length === 0 ? styles.fullHeight : undefined}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  fullHeight: {
    flexGrow: 1,
  },
});

export default JobList;