import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import axios from 'axios';
import Geolocation, {
  GeoError,
  GeoPosition,
} from 'react-native-geolocation-service';
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  MapPin,
  Wind,
  Droplets,
  Thermometer,
} from 'lucide-react-native';

const API_KEY = 'b3937eec4af0e79a17d30fb04c5a8496';
const DEFAULT_CITY = 'Dhaka';

interface ForecastItem {
  id: string;
  day: string;
  temp: number;
  type: string;
}

export default function ForecastScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ডায়নামিক আজকের তারিখ জেনারেট করা
  const getFormattedDate = () => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      };
      return new Date().toLocaleDateString('en-US', options);
    } catch (e) {
      console.log('Date formatting error:', e);
      return '';
    }
  };

  // কারেন্ট সিস্টেম ডেটের ওপর ভিত্তি করে আগামী ৩ দিনের নাম জেনারেট করা
  const getBackupForecast = useCallback((): ForecastItem[] => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = new Date().getDay();
    return [
      { id: 'b1', day: days[(todayIndex + 1) % 7], temp: 31, type: 'clouds' },
      { id: 'b2', day: days[(todayIndex + 2) % 7], temp: 33, type: 'clear' },
      { id: 'b3', day: days[(todayIndex + 3) % 7], temp: 29, type: 'rain' },
    ];
  }, []);

  // ৫ দিনের ফোরকাস্ট লিস্ট থেকে আগামী ৩ দিনের ইউনিক ডেটা ফিল্টার করা
  const processForecastData = useCallback(
    (list: any[]) => {
      try {
        if (!list || !Array.isArray(list)) return getBackupForecast();

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const todayStr = days[new Date().getDay()];
        const uniqueDays: { [key: string]: any } = {};

        for (const item of list) {
          if (!item || !item.dt) continue;

          const date = new Date(item.dt * 1000);
          const dayName = days[date.getDay()];

          if (dayName !== todayStr && !uniqueDays[dayName]) {
            const dtTxt = item.dt_txt || '';
            const isNoon =
              dtTxt.includes('12:00:00') || dtTxt.includes('15:00:00');

            if (isNoon || Object.keys(uniqueDays).length < 3) {
              uniqueDays[dayName] = {
                id: item.dt.toString(),
                day: dayName,
                temp: Math.round(item.main?.temp ?? 30),
                type: item.weather?.[0]?.main?.toLowerCase() ?? 'clouds',
              };
            }
          }
        }

        const result = Object.values(uniqueDays);
        return result.length > 0
          ? (result.slice(0, 3) as ForecastItem[])
          : getBackupForecast();
      } catch (e) {
        console.log('Error processing forecast:', e);
        return getBackupForecast();
      }
    },
    [getBackupForecast],
  );

  // মেইন ওয়েদার ও ফোরকাস্ট ফেচ করার নিরাপদ ফাংশন
  const fetchWeatherData = useCallback(
    async (urlWeather: string, urlForecast: string, cityName?: string) => {
      setLoading(true);
      let finalWeather = null;
      let finalForecast = getBackupForecast();

      // ১. কারেন্ট ওয়েদার ফেচিং
      try {
        const response = await axios.get(urlWeather, { timeout: 8000 });
        if (response && response.data) {
          finalWeather = response.data;
          if (finalWeather.name) {
            const lowerName = finalWeather.name.toLowerCase();
            if (lowerName.includes('takipur') || lowerName.includes('paba')) {
              finalWeather.name = 'Rajshahi';
            }
          }
        }
      } catch (error: any) {
        console.log('Weather API Error:', error?.message || error);
      }

      // ২. ফোরকাস্ট ফেচিং
      try {
        const response = await axios.get(urlForecast, { timeout: 8000 });
        if (response && response.data && response.data.list) {
          finalForecast = processForecastData(response.data.list);
        }
      } catch (error: any) {
        console.log('Forecast API Error:', error?.message || error);
      }

      // ৩. স্টেট আপডেট এবং সেফটি চেক
      if (finalWeather) {
        setWeather(finalWeather);
        setForecast(finalForecast);
        setErrorMsg(null);
      } else {
        setWeather({
          name: cityName || DEFAULT_CITY,
          sys: { country: 'BD' },
          main: { temp: 28, feels_like: 32, humidity: 75 },
          wind: { speed: 3.5 },
        });
        setForecast(getBackupForecast());
        setErrorMsg('লাইভ আবহাওয়া লোড করা যায়নি (অফলাইন মোড)');
      }
      setLoading(false);
    },
    [processForecastData, getBackupForecast],
  );

  const fetchWeatherByCity = useCallback(
    (city: string) => {
      const cleanCity = city || DEFAULT_CITY;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&units=metric&appid=${API_KEY}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cleanCity}&units=metric&appid=${API_KEY}`;
      fetchWeatherData(weatherUrl, forecastUrl, cleanCity);
    },
    [fetchWeatherData],
  );

  const fetchWeatherByCoords = useCallback(
    (lat: number, lon: number) => {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      fetchWeatherData(weatherUrl, forecastUrl);
    },
    [fetchWeatherData],
  );

  // জিপিএস লোকেশন নেওয়া (লাল দাগ ফিক্সড)
  const getLocation = useCallback(() => {
    try {
      Geolocation.getCurrentPosition(
        (position: GeoPosition) => {
          if (position && position.coords) {
            fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude,
            );
          } else {
            fetchWeatherByCity(DEFAULT_CITY);
          }
        },
        (error: GeoError) => {
          console.log('GPS Location Error:', error.message);
          fetchWeatherByCity(DEFAULT_CITY);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 30000 },
      );
    } catch (err: any) {
      console.log('Geolocation runtime error:', err);
      fetchWeatherByCity(DEFAULT_CITY);
    }
  }, [fetchWeatherByCoords, fetchWeatherByCity]);

  // পারমিশন হ্যান্ডলার (লাল দাগ ফিক্সড)
  const requestLocationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          getLocation();
        } else {
          fetchWeatherByCity(DEFAULT_CITY);
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          fetchWeatherByCity(DEFAULT_CITY);
        }
      }
    } catch (err: any) {
      console.log('Permission request catch error:', err);
      fetchWeatherByCity(DEFAULT_CITY);
    }
  }, [getLocation, fetchWeatherByCity]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      requestLocationPermission();
    }
    return () => {
      isMounted = false;
    };
  }, [requestLocationPermission]);

  // আইকন রেন্ডারিং
  const getWeatherIcon = (type: string, size = 32) => {
    const mainType = type ? type.toLowerCase() : 'clouds';
    if (mainType.includes('clear') || mainType.includes('sunny')) {
      return <Sun size={size} color="#FFB300" />;
    } else if (mainType.includes('thunder') || mainType.includes('lightning')) {
      return <CloudLightning size={size} color="#FFD54F" />;
    } else if (mainType.includes('rain') || mainType.includes('drizzle')) {
      return <CloudRain size={size} color="#64B5F6" />;
    } else {
      return <CloudSun size={size} color="#FFF" />;
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFB300" />
        <Text style={{ color: '#aaa', marginTop: 12 }}>
          আবহাওয়া তথ্য লোড হচ্ছে...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerSubtitle}>Weather</Text>
            <Text style={styles.headerTitle}>Forecast</Text>
          </View>

          {/* Main Weather Card */}
          <View style={styles.mainCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.todayText}>Today</Text>
              <Text style={styles.dateText}>{getFormattedDate()}</Text>
            </View>

            <View style={styles.tempContainer}>
              <View style={styles.tempTextWrapper}>
                <Text style={styles.currentTemp}>
                  {Math.round(weather?.main?.temp ?? 0)}
                </Text>
                <Text style={styles.degreeUnit}>°C</Text>
              </View>

              <View style={styles.mainIconWrapper}>
                <Sun size={55} color="#FFA000" />
                <CloudSun size={75} color="#FFFFFF" style={styles.cloudFront} />
              </View>
            </View>

            <View style={styles.locationContainer}>
              <MapPin size={16} color="#9CA3AF" style={{ marginRight: 6 }} />
              <Text style={styles.locationText}>
                {weather?.name ?? 'Dhaka'}, {weather?.sys?.country ?? 'BD'}
              </Text>
            </View>
          </View>

          {/* Parameters Section */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Thermometer size={20} color="#9CA3AF" />
              <Text style={styles.infoLabel}>Feels Like</Text>
              <Text style={styles.infoValue}>
                {Math.round(weather?.main?.feels_like ?? 0)}°
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Wind size={20} color="#9CA3AF" />
              <Text style={styles.infoLabel}>Wind</Text>
              <Text style={styles.infoValue}>
                {Math.round((weather?.wind?.speed ?? 0) * 3.6)} km/h
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Droplets size={20} color="#9CA3AF" />
              <Text style={styles.infoLabel}>Humidity</Text>
              <Text style={styles.infoValue}>
                {weather?.main?.humidity ?? 0}%
              </Text>
            </View>
          </View>

          {/* 3-Day Forecast Section */}
          <View style={styles.forecastRow}>
            {Array.isArray(forecast) &&
              forecast.map((item: ForecastItem) => (
                <View key={item.id} style={styles.forecastCard}>
                  <View style={styles.forecastIconWrapper}>
                    {getWeatherIcon(item.type, 32)}
                  </View>
                  <Text style={styles.forecastTemp}>{item.temp}°c</Text>
                  <Text style={styles.forecastDay}>{item.day}</Text>
                </View>
              ))}
          </View>

          {errorMsg && <Text style={styles.activationText}>{errorMsg}</Text>}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  innerWrapper: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 1,
    margin: -1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: '#0D0D0D',
  },
  header: { marginTop: 20, marginBottom: 24 },
  headerSubtitle: { color: '#9CA3AF', fontSize: 18, fontWeight: '500' },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  mainCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 28,
    padding: 24,
    marginBottom: 28,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  dateText: { color: '#6B7280', fontSize: 14 },
  tempContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  tempTextWrapper: { flexDirection: 'row', alignItems: 'flex-start' },
  currentTemp: { color: '#FFFFFF', fontSize: 72, fontWeight: '300' },
  degreeUnit: {
    color: '#FFB300',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 12,
    marginLeft: 2,
  },
  mainIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  cloudFront: {
    marginLeft: -25,
    marginTop: 15,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: { color: '#9CA3AF', fontSize: 15 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#121212',
    paddingVertical: 16,
    borderRadius: 20,
    marginBottom: 28,
  },
  infoItem: { alignItems: 'center' },
  infoLabel: { color: '#6B7280', fontSize: 12, marginTop: 6, marginBottom: 2 },
  infoValue: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  forecastRow: { flexDirection: 'row', justifyContent: 'space-between' },
  forecastCard: {
    backgroundColor: '#1A1A1A',
    width: '30%',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  forecastIconWrapper: { marginBottom: 10 },
  forecastTemp: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  forecastDay: { color: '#6B7280', fontSize: 13, marginTop: 4 },
  activationText: {
    color: '#FFB300',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    fontStyle: 'italic',
  },
});
