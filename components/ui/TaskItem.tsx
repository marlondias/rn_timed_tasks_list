import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function TaskItem() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.innerRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>🛠️ Build project demo</Text>
          <Text style={styles.subText}>Estimated time: 30m</Text>
        </View>

        <View style={styles.controlsWrapper}>
          <TouchableOpacity
            style={styles.controlButton}
            activeOpacity={0.7}
            onPress={() => setIsRunning(prev => !prev)}
          >
            <Text style={styles.controlIcon}>{isRunning ? "⏸️" : "▶️"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} activeOpacity={0.7} onPress={() => console.log("Options pressed")}> 
            <Text style={styles.controlIcon}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff9000",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 6,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "rgba(255,255,255,0.4)",
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 2,
  },
  controlsWrapper: {
    width: 110,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  controlIcon: {
    color: "#fff",
    fontSize: 20,
  },
});
