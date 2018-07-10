import React from "react";
import { View, ActivityIndicator } from "react-native-web";

// Make a component
const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || "large"} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

// Make the component available to other parts of the app
export { Spinner };
