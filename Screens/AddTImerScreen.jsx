import React, { useState, useContext } from 'react';
import styles from '../Styles';
import { View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import TimerContext from '../Context/TimerContext';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Import Picker

export default function AddTimerScreen() {
  const { dispatch } = useContext(TimerContext);
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const addTimer = () => {
    if (!name.trim() || !duration.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid timer name and duration.');
      return;
    }

    const totalSeconds = parseInt(duration) * 60 ;
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      Alert.alert('Invalid Duration', 'Duration must be a positive number.');
      return;
    }
    
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: totalSeconds,
      remaining: totalSeconds,
      category,
      running: false,
      halfwayAlert, 
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name:</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
        placeholder="Enter timer name" 
      />

      <Text style={styles.label}>Duration (Mins):</Text>
      <TextInput 
        style={styles.input} 
        value={duration} 
        onChangeText={setDuration} 
        keyboardType="numeric" 
        placeholder="Enter duration in mintues" 
      />

      <Text style={styles.label}>Category:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Break" value="Break" />
          <Picker.Item label="sleep" value="Sleep" />
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Enable Halfway Alert</Text>
        <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
      </View>

      <Button title="Save Timer" color={"#5C7285"} onPress={addTimer} />
    </View>
  );
}
