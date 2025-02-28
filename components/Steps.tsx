import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
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
                      backgroundColor: index < currentStep ? "#25D360" : "#ccc",
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
    borderColor: "#25D360",
    backgroundColor: "#25D360",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
  completedStepCircle: {
    borderColor: "#21bd56",
    backgroundColor: "#21bd56",
  },
  stepNumber: {
    fontWeight: "bold",
  },
  stepNumberEnable: {
    color: "#FFF",
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
