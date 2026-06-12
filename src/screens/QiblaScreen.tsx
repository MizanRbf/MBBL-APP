import React, { useCallback, useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import CompassHeading from 'react-native-compass-heading';

export default function QiblaScreen() {
  const [qibla, setQibla] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);

  const calculateQibla = (lat: number, lon: number) => {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const toRad = (d: number) => (d * Math.PI) / 180;
    const toDeg = (r: number) => (r * 180) / Math.PI;

    const dLon = toRad(kaabaLon - lon);

    const y = Math.sin(dLon);
    const x =
      Math.cos(toRad(lat)) * Math.tan(toRad(kaabaLat)) -
      Math.sin(toRad(lat)) * Math.cos(dLon);

    let brng = toDeg(Math.atan2(y, x));

    return (brng + 360) % 360;
  };

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const angle = calculateQibla(lat, lon);
        setQibla(angle);
      },
      error => {
        console.log('Location Error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  const requestPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
    } else {
      getLocation();
    }
  }, [getLocation]);

  const startCompass = useCallback(() => {
    CompassHeading.start(3, (data: any) => {
      setHeading(data?.heading ?? 0);
    });
  }, []);

  useEffect(() => {
    requestPermission();
    startCompass();

    return () => {
      CompassHeading.stop();
    };
  }, [requestPermission, startCompass]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧭 Qibla Compass</Text>
      {/* Compass Image */}
      <View style={styles.compassWrapper}>
        <View
          style={[
            styles.compassCircle,
            {
              transform: [{ rotate: `${-heading}deg` }],
            },
          ]}
        >
          <Text style={styles.north}>N</Text>
          <Text style={styles.east}>E</Text>
          <Text style={styles.south}>S</Text>
          <Text style={styles.west}>W</Text>
        </View>

        <View
          style={[
            styles.qiblaNeedle,
            {
              transform: [{ rotate: `${(qibla ?? 0) - heading}deg` }],
            },
          ]}
        >
          <Text style={{ fontSize: 20 }}>🕋</Text>
        </View>

        <View style={styles.centerDot} />
      </View>

      <Text style={styles.sub}>Phone Heading: {heading.toFixed(0)}°</Text>
      {qibla !== null ? (
        <Text style={styles.angle}>Qibla Direction: {qibla.toFixed(2)}°</Text>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  compassWrapper: {
    width: 320,
    height: 320,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  compassCircle: {
    width: 300,
    height: 300,
    borderRadius: 160,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
  },

  centerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },

  qiblaNeedle: {
    position: 'absolute',
    width: 260,
    alignItems: 'flex-start',
    color: 'white',
  },
  compassContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  north: {
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53935',
  },

  east: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -15,
    fontSize: 24,
    fontWeight: '600',
    color: '#6B7280',
  },

  south: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#6B7280',
  },

  west: {
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: -15,
    fontSize: 24,
    fontWeight: '600',
    color: '#6B7280',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 30,
    color: '#F8DE22',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  sub: {
    fontSize: 18,
    marginTop: 12,
    color: '#F8DE22',
  },
  angle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
});
