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
    return () => CompassHeading.stop();
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

  const renderTicks = () => {
    const ticks = [];

    for (let i = 0; i < 360; i += 10) {
      const isMain = i % 30 === 0;

      ticks.push(
        <View
          key={i}
          style={[styles.tick, { transform: [{ rotate: `${i}deg` }] }]}
        >
          <View style={[styles.tickLine, isMain && styles.mainTick]} />

          {isMain && <Text style={styles.degreeLabel}>{i}</Text>}
        </View>,
      );
    }

    return ticks;
  };

  return (
    <View style={styles.container}>
      <View style={styles.compassWrapper}>
        {/* Pointer */}
        <View style={styles.pointer}>
          <Text style={styles.pointerText}>▼</Text>
        </View>

        {/* Compass Circle */}
        <View
          style={[
            styles.compassCircle,
            { transform: [{ rotate: `${-heading}deg` }] },
          ]}
        >
          {renderTicks()}

          {/* N E S W */}
          <Text style={styles.north}>North</Text>
          <Text style={styles.east}>East</Text>
          <Text style={styles.south}>South</Text>
          <Text style={styles.west}>West</Text>
        </View>

        {/* Center */}
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
    top: -29,
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  tick: {
    position: 'absolute',
    width: 320,
    height: 320,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  tickLine: {
    width: 2,
    height: 8,
    backgroundColor: '#666',
    marginTop: 6,
  },

  mainTick: {
    height: 14,
    backgroundColor: '#fff',
  },

  degreeLabel: {
    position: 'absolute',
    top: 22,
    fontSize: 10,
    color: '#aaa',
  },

  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  degreeText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },

  headingText: {
    marginTop: 40,
    color: '#888',
    fontSize: 20,
  },

  directionText: {
    fontSize: 22,
    color: '#fff',
    marginTop: 30,
    fontWeight: '600',
  },

  north: {
    position: 'absolute',
    top: 30,
    color: '#ff3b30',
    fontSize: 18,
    fontWeight: 'bold',
  },

  east: {
    position: 'absolute',
    right: 35,
    top: '46%',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  south: {
    position: 'absolute',
    bottom: 30,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  west: {
    position: 'absolute',
    left: 35,
    top: '46%',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
