import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('SavedJobs')}
        style={styles.savedButton}
      >
        <Icon name="bookmark" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  savedButton: {
    padding: 4,
  },
});

export default Header;