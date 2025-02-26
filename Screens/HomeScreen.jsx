import React, { useContext, useState } from "react";
import styles from "../Styles";
import { View, Text, FlatList, Button, TouchableOpacity } from "react-native";
import TimerContext from "../Context/TimerContext";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import Modal from "react-native-modal";

export default function HomeScreen() {
  const { state, dispatch } = useContext(TimerContext);
  const navigation = useNavigation();

  // Group timers by category
  const groupedTimers = state.timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add Timer"
        color={"#5C7285"}
        onPress={() => navigation.navigate("Add Timer")}
      />

      <Modal
        isVisible={state.completedTimer !== null}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>🎉 Timer Completed!</Text>
          <Text style={styles.modalText}>
            {state.completedTimer?.name} has finished.
          </Text>
          <Button
            title="OK"
            onPress={() => dispatch({ type: "CLEAR_COMPLETED_TIMER" })}
          />
        </View>
      </Modal>

      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={(item) => item}
        renderItem={({ item: category }) => (
          <View style={styles.categoryContainer}>
            <TouchableOpacity onPress={() => toggleCategory(category)}>
              <Text style={styles.categoryHeader}>
                {category} {expandedCategories[category] ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedCategories[category] && (
              <View style={styles.bulkButtonContainer}>
                <Button
                  title="Start All"
                  color="#578FCA"
                  onPress={() => bulkAction(category, "START_ALL")}
                />
                <Button
                  title="Pause All"
                  color="#E07A5F"
                  onPress={() => bulkAction(category, "PAUSE_ALL")}
                />
                <Button
                  title="Reset All"
                  color="#3D3D3D"
                  onPress={() => bulkAction(category, "RESET_ALL")}
                />
              </View>
            )}

            {expandedCategories[category] &&
              groupedTimers[category].map((timer) => {
                const progress = timer.remaining / timer.duration;
                const percentage = Math.round(progress * 100);

                return (
                  <View key={timer.id} style={styles.timerCard}>
                    <Text style={styles.timerText}>{timer.name}</Text>
                    <Text style={styles.timerText}>
                      Remaining:{" "}
                      {timer.remaining > 60
                        ? `${Math.floor(timer.remaining / 60)} min`
                        : `${timer.remaining} sec`}{" "}
                    </Text>
                    <Text style={styles.timerText}>Status: {timer.status}</Text>

                    <Progress.Bar
                      progress={progress}
                      style={{ marginTop: "10%" }}
                      width={300}
                      color={progress > 0.5 ? "#5B913B" : "#FB4141"}
                    />
                    <Text style={styles.percentageText}>{percentage}%</Text>

                    <View style={styles.buttonContainer}>
                      <Button
                        title="Start"
                        color={"#578FCA"}
                        onPress={() =>
                          dispatch({ type: "START_TIMER", payload: timer.id })
                        }
                      />
                      <Button
                        title="Pause"
                        color={"#E07A5F"}
                        onPress={() =>
                          dispatch({ type: "PAUSE_TIMER", payload: timer.id })
                        }
                      />
                      <Button
                        title="Reset"
                        color={"#3D3D3D"}
                        onPress={() =>
                          dispatch({ type: "RESET_TIMER", payload: timer.id })
                        }
                      />
                      <Button
                        title="Delete"
                        color={"#B8001F"}
                        onPress={() =>
                          dispatch({ type: "DELETE_TIMER", payload: timer.id })
                        }
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        )}
      />
      <Button
        title="View History"
        color={"#6482AD"}
        onPress={() => navigation.navigate("History")}
      />
    </View>
  );
}
