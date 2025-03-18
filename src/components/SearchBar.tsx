import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobContext';

const SearchBar: React.FC = () => {
  const { colors } = useTheme();
  const { searchJobs } = useJobs();
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    searchJobs(text);
  };

  const clearSearch = () => {
    setQuery('');
    searchJobs('');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Icon name="search" size={20} color={colors.secondary} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Search for jobs..."
        placeholderTextColor={colors.secondary}
        value={query}
        onChangeText={handleSearch}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Icon name="close-circle" size={20} color={colors.secondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    padding: 5,
  },
});

export default SearchBar;