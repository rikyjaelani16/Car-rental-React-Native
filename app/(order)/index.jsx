import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-stepper";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";
import { useState } from "react";
export default function index() {
  const [activeStep, setActiveStep] = useState(0);
  const [payment, setPayment] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          switch (activeStep) {
            case 0:
              router.back();
            case 1:
              setActiveStep(activeStep - 1);
            case 2:
              setActiveStep(activeStep - 1);
          }
        }}
      >
        <Ionicons size={40} name="arrow-back-outline" color={"#000000"} />
      </TouchableOpacity>

      <ProgressSteps activeStep={activeStep}>
        <ProgressStep
          label="Pilih Metode"
          removeBtnRow="true"
          scrollable={false}
        >
          <Step1
            setActiveStep={setActiveStep}
            payment={payment}
            setPayment={setPayment}
          />
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow="true" scrollable={false}>
          <Step2
            setActiveStep={setActiveStep}
            payment={payment}
            setPayment={setPayment}
          />
        </ProgressStep>
        <ProgressStep label="Tiket" removeBtnRow="true" scrollable={false}>
          <Step3
            setActiveStep={setActiveStep}
            payment={payment}
            setPayment={setPayment}
          />
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}
const styles = StyleSheet.create({
  paymentText: {
    flex: 1,
    fontSize: 16,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#D0D0D0",
    marginBottom: 10,
  },
});
