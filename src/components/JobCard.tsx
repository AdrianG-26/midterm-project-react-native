import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Job } from '../types/types';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobContext';

interface JobCardProps {
  job: Job;
  showSaveButton?: boolean;
  showRemoveButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  showSaveButton = true,
  showRemoveButton = false,
}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { colors } = useTheme();
  const { saveJob, removeJob, isJobSaved, hasApplied } = useJobs();

  const handleApply = () => {
    navigation.navigate('Application', { job });
  };

  const handleSave = () => {
    saveJob(job);
  };

  const handleRemove = () => {
    removeJob(job.id);
  };

  const saved = isJobSaved(job.id);
  const applied = hasApplied(job.id);

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
        <Text style={[styles.company, { color: colors.primary }]}>{job.company}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <Icon name="location-outline" size={16} color={colors.secondary} />
          <Text style={[styles.detailText, { color: colors.secondary }]}>{job.location}</Text>
        </View>
        <View style={styles.detail}>
          <Icon name="cash-outline" size={16} color={colors.secondary} />
          <Text style={[styles.detailText, { color: colors.secondary }]}>{job.salary}</Text>
        </View>
        <View style={styles.detail}>
          <Icon name="calendar-outline" size={16} color={colors.secondary} />
          <Text style={[styles.detailText, { color: colors.secondary }]}>{job.postedDate}</Text>
        </View>
      </View>

      <Text 
        style={[styles.description, { color: colors.text }]} 
        numberOfLines={3} 
        ellipsizeMode="tail"
      >
        {job.description}
      </Text>

      <View style={styles.footer}>
        {showSaveButton && (
          <TouchableOpacity
            style={[
              styles.button,
              saved ? { backgroundColor: colors.secondary } : { backgroundColor: colors.primary }
            ]}
            onPress={handleSave}
            disabled={saved}
          >
            <Text style={styles.buttonText}>
              {saved ? 'Saved' : 'Save Job'}
            </Text>
          </TouchableOpacity>
        )}

        {showRemoveButton && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.error }]}
            onPress={handleRemove}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            applied ? { backgroundColor: colors.secondary } : { backgroundColor: colors.primary }
          ]}
          onPress={handleApply}
        >
          <Text style={styles.buttonText}>
            {applied ? 'Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default JobCard;