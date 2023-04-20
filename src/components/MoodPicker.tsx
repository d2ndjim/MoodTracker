import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  return (
    <View style={styles.container}>
      <View style={styles.moodList}>
        {moodOptions.map(mood => (
          <View key={mood.emoji}>
            <Pressable
              onPress={() => setSelectedMood(mood)}
              style={[
                styles.moodItem,
                selectedMood?.emoji === mood.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{mood.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === mood.emoji
                ? mood.description
                : undefined}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.chooser}>
        <Text style={styles.chooserText}>Choose</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#454C73',
  },
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: '#454C73',
    borderColor: '#fff',
  },
  descriptionText: {
    color: '#454C73',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  chooser: {
    backgroundColor: '#454C73',
    padding: 20,
    borderRadius: 20,
    margin: 40,
    alignItems: 'center',
  },
  chooserText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
