import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function Stepper() {
  return (
    <View style={styles.container}>
      {/* Step 1: Pilih Metode */}
      <View style={styles.stepContainer}>
        <View style={[styles.circle, styles.activeStep]}>
          <Text style={styles.stepText}>1</Text>
        </View>
        <Text style={[styles.label, styles.activeLabel]}>Pilih Metode</Text>
      </View>

      {/* Line Between Steps */}
      <View style={styles.line} />

      {/* Step 2: Bayar */}
      <View style={styles.stepContainer}>
        <View style={styles.circle}>
          <Text style={styles.stepText}>2</Text>
        </View>
        <Text style={styles.label}>Bayar</Text>
      </View>

      {/* Line Between Steps */}
      <View style={styles.line} />

      {/* Step 3: Tiket */}
      <View style={styles.stepContainer}>
        <View style={styles.circle}>
          <Text style={styles.stepText}>3</Text>
        </View>
        <Text style={styles.label}>Tiket</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    marginTop: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#4CAF50", // Green border color
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: "#4CAF50", // Green background for active step
  },
  stepText: {
    color: "#FFFFFF", // White text color
    fontWeight: "bold",
  },
  label: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "#000000", // Default black text color
  },
  activeLabel: {
    color: "#4CAF50", // Green text color for active label
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: "#4CAF50", // Green line color
  },
});
