import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const AnimatedView = Animated.createAnimatedComponent(View);

CustomLabel.defaultProps = {
  leftDiff: 0,
};

const width = 100;
const pointerWidth = width * 0.47;

function LabelBase(props) {
  const { position, value, leftDiff, pressed, currency, isLeftData } = props;
  const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
  const cachedPressed = React.useRef(pressed);
  React.useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: pressed ? 1 : 0.1,
      duration: 200,
      delay: pressed ? 0 : 2000,
      useNativeDriver: false,
    }).start();
    cachedPressed.current = pressed;
  }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <AnimatedView
        style={[
          styles.sliderLabel,
          {
            left: position - width / 2,
            bottom: isLeftData ? 0 : -60,
            // transform: [
            //   { translateY: width },
            //   { scale: scaleValue.current },
            //   { translateY: -width },
            // ],
          },
        ]}
      >
        {/* <View style={styles.pointer} /> */}
        <Text style={styles.sliderLabelText}>{value + " " + currency}</Text>
      </AnimatedView>

      //   <View style={{ width: 50, height: 50 }}>
      //     <Text style={styles.sliderLabelText}>{value}</Text>
      //   </View>
    )
  );
}

export default function CustomLabel(props) {
  const {
    leftDiff,
    oneMarkerValue,
    twoMarkerValue,
    oneMarkerLeftPosition,
    twoMarkerLeftPosition,
    oneMarkerPressed,
    twoMarkerPressed,
    currency,
  } = props;

  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        leftDiff={leftDiff}
        pressed={oneMarkerPressed}
        currency={currency}
        isLeftData={true}
      />
      <LabelBase
        position={twoMarkerLeftPosition}
        value={twoMarkerValue}
        leftDiff={leftDiff}
        pressed={twoMarkerPressed}
        currency={currency}
        isLeftData={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    position: "relative",
  },
  sliderLabel: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    width: width,
    // height: 50,
  },
  sliderLabelText: {
    textAlign: "center",
    // lineHeight: width,
    // borderRadius: width / 2,
    // borderWidth: 2,
    borderColor: "#999",
    // height: 50,
    flex: 1,
    fontSize: 15,
    color: "#aaa",
  },
  pointer: {
    position: "absolute",
    bottom: -pointerWidth / 4,
    left: (width - pointerWidth) / 2,
    transform: [{ rotate: "45deg" }],
    width: pointerWidth,
    height: pointerWidth,
    backgroundColor: "#999",
  },
});
