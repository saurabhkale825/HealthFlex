import React, { useContext } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import styles from '../Styles';
import TimerContext from '../Context/TimerContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function HistoryScreen() {
  const { state } = useContext(TimerContext);
  

  const completedTimers = state.completedTimers || [];

  const exportHistory = async () => {
    if (completedTimers.length === 0) {
      Alert.alert("No History", "There are no completed timers to export.");
      return;
    }

    const fileUri = FileSystem.documentDirectory + 'timer_history.json';
    const jsonData = JSON.stringify(completedTimers, null, 2);

    try {
      await FileSystem.writeAsStringAsync(fileUri, jsonData);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("Export Failed", "An error occurred while exporting.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.historyHeader}>Timer History</Text>

      {completedTimers.length === 0 ? (
        <Text style={styles.noHistory}>No completed timers yet.</Text>
      ) : (
        <FlatList
          data={completedTimers}
          keyExtractor={(item, index) => item.id ? item.id.toString() : `history-${index}`}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.timerText}>{item.name}</Text>
              <Text style={styles.completedAt}>Completed at: {item.completedAt}</Text>
            </View>
          )}
        />
      )}

    
      <Button title="Export Timer History" color="#5C7285" onPress={exportHistory} />
    </View>
  );
}
