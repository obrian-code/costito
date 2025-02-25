import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Keyboard,
} from "react-native";

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepsProps {
  steps: Step[];
}

export function Steps({ steps }: StepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <TouchableOpacity
                style={[
                  styles.stepCircle,
                  currentStep === index ? styles.activeStepCircle : {},
                  index < currentStep ? styles.completedStepCircle : {},
                ]}
              >
                <Text
                  style={[
                    styles.stepNumber,
                    currentStep === index
                      ? styles.stepNumberEnable
                      : styles.stepNumberDisable,
                  ]}
                >
                  {index + 1}
                </Text>
              </TouchableOpacity>
              <Text style={styles.stepTitle}>{step.title}</Text>
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: index < currentStep ? "#007BFF" : "#ccc",
                    },
                  ]}
                />
              )}
            </View>
          ))}
        </View>
        {steps[currentStep].content}
      </View>
      {!keyboardVisible && (
        <View style={styles.buttons}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.buttonPrev} onPress={prevStep}>
              <Text style={styles.buttonPrevText}> Anterior</Text>
            </TouchableOpacity>
          )}
          {currentStep < steps.length - 1 ? (
            <TouchableOpacity style={styles.buttonNext} onPress={nextStep}>
              <Text style={styles.buttonPrevNext}> Siguiente</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => alert("Finished!")}
            >
              <Text style={styles.buttonPrevNext}>Finalizar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  stepIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  activeStepCircle: {
    borderColor: "#007BFF",
    backgroundColor: "#E3F2FD",
  },
  completedStepCircle: {
    borderColor: "#007BFF",
    backgroundColor: "#E3F2FD",
  },
  stepNumber: {
    fontWeight: "bold",
  },
  stepNumberEnable: {
    color: "#007BFF",
  },
  stepNumberDisable: {
    color: "#ccc",
  },
  stepTitle: {
    textAlign: "center",
    fontSize: 12,
  },
  line: {
    position: "absolute",
    top: 20,
    right: 0,
    left: 50,
    width: 18,
    height: 2,
  },
  buttons: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",

    backgroundColor: "white",
  },
  buttonNext: {
    width: "47%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#25D360",
  },
  buttonPrevNext: {
    color: "white",
    fontSize: 15,
  },
  buttonPrev: {
    width: "47%",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#F0F0F4",
  },
  buttonPrevText: {
    color: "black",
    fontSize: 15,
  },
});
