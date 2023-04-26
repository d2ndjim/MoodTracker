import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History: React.FC = () => {
  const appContext = useAppContext();
  return (
    <ScrollView style={styles.history}>
      {appContext.moodList
        .slice()
        .reverse()
        .map(item => (
          <MoodItemRow
            handleDeleteMood={appContext.handleDeleteMood}
            item={item}
            key={item.timestamp}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  history: {
    marginTop: 10,
  },
});
