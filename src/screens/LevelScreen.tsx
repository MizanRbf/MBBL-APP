import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, Dimensions } from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { map } from 'rxjs/operators';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.7;

export default function LevelScreen() {
  const [verticalAngle, setVerticalAngle] = useState(0);
  const [horizontalAngleX, setHorizontalAngleX] = useState(0);
  const [horizontalAngleY, setHorizontalAngleY] = useState(0);
  const [isFlat, setIsFlat] = useState(false);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 16);

    const subscription = accelerometer
      .pipe(
        map(({ x, y, z }) => {
          let radV = Math.atan2(x, y);
          let degV = Math.round(radV * (180 / Math.PI));

          let degHX = Math.round(Math.atan2(x, z) * (180 / Math.PI));
          let degHY = Math.round(Math.atan2(y, z) * (180 / Math.PI));

          const flatStatus = Math.abs(z) > 6.5;

          return { v: degV, hX: degHX, hY: degHY, flat: flatStatus };
        }),
      )
      .subscribe(({ v, hX, hY, flat }) => {
        setVerticalAngle(v);
        setHorizontalAngleX(hX);
        setHorizontalAngleY(hY);
        setIsFlat(flat);
      });

    return () => subscription.unsubscribe();
  }, []);

  // --- লেভেল চেক কন্ডিশন ---
  const isVerticalLevel = Math.abs(verticalAngle) === 0;
  const isHorizontalLevel =
    Math.abs(horizontalAngleX) === 0 && Math.abs(horizontalAngleY) === 0;

  // --- মোড ১: Vertical Animation (Rotation) ---
  const rotation = useDerivedValue(() => {
    return withSpring(verticalAngle, { damping: 25, stiffness: 100 });
  });

  const verticalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // --- মোড ২: Horizontal/Flat Animation ---
  const animX = useDerivedValue(() => {
    const maxTranslate = CIRCLE_SIZE * 0.6;
    const targetX = -horizontalAngleX * 5.5;
    return withSpring(
      Math.max(-maxTranslate, Math.min(maxTranslate, targetX)),
      { damping: 20, stiffness: 100 },
    );
  });

  const animY = useDerivedValue(() => {
    const maxTranslate = CIRCLE_SIZE * 0.6;
    const targetY = horizontalAngleY * 5.5;
    return withSpring(
      Math.max(-maxTranslate, Math.min(maxTranslate, targetY)),
      { damping: 20, stiffness: 100 },
    );
  });

  const bubbleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animX.value }, { translateY: animY.value }],
    };
  });

  // 🎨 কালার লজিকস
  const isGreenActive = isFlat ? isHorizontalLevel : isVerticalLevel;
  const activeBorderColor = isGreenActive ? '#4CD964' : '#fff';
  const activeBubbleColor = isFlat && isHorizontalLevel ? '#000' : '#fff';
  const activePlusColor = isHorizontalLevel ? '#4CD964' : '#000';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 🔮 মেইন মিটার সার্কেল */}
      <View
        style={[styles.circleContainer, { borderColor: activeBorderColor }]}
      >
        {isFlat ? (
          /* =========================================================
             মোড ২ (Horizontal/Flat Mode)
             ========================================================= */
          <Animated.View
            style={[
              styles.movingBubble,
              bubbleAnimatedStyle,
              { backgroundColor: activeBubbleColor },
            ]}
          >
            <View style={styles.crosshairContainer}>
              <View
                style={[
                  styles.plusSignVertical,
                  { backgroundColor: activePlusColor },
                ]}
              />
              <View
                style={[
                  styles.plusSignHorizontal,
                  { backgroundColor: activePlusColor },
                ]}
              />
            </View>
          </Animated.View>
        ) : (
          /* =========================================================
             মোড ১ (Vertical Mode) - ডটেড লাইনের সাথে নিখুঁত মেলানো লুক
             ========================================================= */
          <>
            <Animated.View
              style={[styles.rotatingCircle, verticalAnimatedStyle]}
            >
              {/* ওপরের সাদা পার্ট */}
              <View
                style={[
                  styles.topHalf,
                  { backgroundColor: isVerticalLevel ? '#000' : '#fff' },
                ]}
              />
              {/* নিচের কালো পার্ট */}
              <View style={styles.bottomHalf} />
            </Animated.View>

            {/* মাঝখানের স্থির ডটেড লাইন */}
            <View style={styles.dottedLine} />

            {/* সেন্টার ডিগ্রি টেক্সট */}
            <Text style={styles.angleText}>{verticalAngle}°</Text>
          </>
        )}
      </View>

      {/* 🔽 নিচের ডাবল রিডিং প্যানেল */}
      <View style={styles.resultContainer}>
        <View style={styles.dataBox}>
          <Text style={styles.label}>Vertical</Text>
          <Text
            style={[
              styles.angleValue,
              !isFlat && isVerticalLevel && styles.greenText,
            ]}
          >
            {isFlat ? Math.abs(horizontalAngleY) : Math.abs(verticalAngle)}°
          </Text>
        </View>

        <View style={styles.dataBox}>
          <Text style={styles.label}>Horizontal</Text>
          <Text
            style={[
              styles.angleValue,
              isFlat && isHorizontalLevel && styles.greenText,
            ]}
          >
            {isFlat ? Math.abs(horizontalAngleX) : '0'}°
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'relative',
  },
  // 🔄 মোড ১: Vertical Styles (Fix করা হয়েছে)
  rotatingCircle: {
    width: CIRCLE_SIZE * 3, // ঘোরার সময় বর্ডার যাতে ব্রেক না করে তাই বড় উইডথ
    height: CIRCLE_SIZE * 3, // হাইটও সমান রাখা হয়েছে নিখুঁত সেন্টারিং এর জন্য
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topHalf: {
    width: '100%',
    height: '50%', // হুবহু অর্ধেক অংশ সাদা থাকবে
  },
  bottomHalf: {
    width: '100%',
    height: '50%', // হুবহু অর্ধেক অংশ কালো থাকবে
    backgroundColor: '#000',
  },
  dottedLine: {
    position: 'absolute',
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#fff',
    opacity: 0.25,
    zIndex: 5, // ডটেড লাইন যাতে একদম ওপরে পরিষ্কার ভেসে থাকে
  },
  angleText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 54,
    fontWeight: '400',
    zIndex: 10,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 8,
  },
  // মোড ২: Horizontal/Flat Styles
  movingBubble: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  crosshairContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  plusSignVertical: {
    width: 2,
    height: 28,
    position: 'absolute',
  },
  plusSignHorizontal: {
    width: 28,
    height: 2,
    position: 'absolute',
  },
  // বটম ডেটা প্যানেল
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 100,
  },
  dataBox: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 15,
    color: '#555555',
    fontWeight: '600',
    marginBottom: 6,
  },
  angleValue: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '400',
  },
  greenText: {
    color: '#4CD964',
  },
});
