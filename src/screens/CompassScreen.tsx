import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CompassHeading from 'react-native-compass-heading';

export default function CompassScreen() {
  const [heading, setHeading] = useState<number>(0);

  const startCompass = useCallback(() => {
    CompassHeading.start(3, ({ heading }: any) => {
      setHeading(heading);
    });
  }, []);

  useEffect(() => {
    startCompass();

    return () => {
      CompassHeading.stop();
    };
  }, [startCompass]);

  const getDirection = (degree: number) => {
    if (degree >= 337.5 || degree < 22.5) return 'North';
    if (degree >= 22.5 && degree < 67.5) return 'North East';
    if (degree >= 67.5 && degree < 112.5) return 'East';
    if (degree >= 112.5 && degree < 157.5) return 'South East';
    if (degree >= 157.5 && degree < 202.5) return 'South';
    if (degree >= 202.5 && degree < 247.5) return 'South West';
    if (degree >= 247.5 && degree < 292.5) return 'West';
    return 'North West';
  };

  return (
    <View style={styles.container}>
      <View style={styles.compassWrapper}>
        {/* Fixed Pointer */}
        <View style={styles.pointer}>
          <Text style={styles.pointerText}>▼</Text>
        </View>

        {/* Rotating Compass Ring */}
        <View
          style={[
            styles.compassCircle,
            {
              transform: [{ rotate: `${-heading}deg` }],
            },
          ]}
        >
          <Text style={styles.north}>North</Text>
          <Text style={styles.east}>East</Text>
          <Text style={styles.south}>South</Text>
          <Text style={styles.west}>West</Text>
        </View>

        {/* Center Content */}
        <View style={styles.centerContent}>
          <Text style={styles.degreeText}>{Math.round(heading)}°</Text>
        </View>
      </View>

      <Text style={styles.headingText}>Heading: {heading.toFixed(1)}°</Text>

      <Text style={styles.directionText}>
        Current Direction:{' '}
        <Text style={{ color: '#ff3b30' }}>{getDirection(heading)}</Text>
      </Text>
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

  compassWrapper: {
    width: 340,
    height: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pointer: {
    position: 'absolute',
    top: -10,
    zIndex: 10,
  },

  pointerText: {
    color: '#ff3b30',
    fontSize: 34,
    fontWeight: 'bold',
  },

  compassCircle: {
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: '#444',
    position: 'absolute',
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  degreeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },

  directionText: {
    fontSize: 25,
    color: '#fff',
    marginTop: 30,
    fontWeight: '600',
  },

  north: {
    position: 'absolute',
    top: 18,
    alignSelf: 'center',
    color: '#ff3b30',
    fontSize: 22,
    fontWeight: 'bold',
  },

  east: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -12,
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },

  south: {
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },

  west: {
    position: 'absolute',
    left: 15,
    top: '50%',
    marginTop: -12,
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },

  headingText: {
    marginTop: 40,
    color: '#888',
    fontSize: 18,
  },
});
