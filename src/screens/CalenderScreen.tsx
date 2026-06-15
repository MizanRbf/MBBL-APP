import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment-hijri';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Calendar
        hideExtraDays={false}
        dayComponent={({ date }) => {
          if (!date) return null;

          const m = moment(date.dateString);

          const englishDay = m.format('D');
          const hijriDay = m.format('iD');

          // Friday = 5, Saturday = 6
          const dayOfWeek = new Date(date.dateString).getDay();

          const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

          return (
            <View style={styles.dayCell}>
              {/* Hijri Date */}
              <Text style={[styles.hijri, isWeekend && styles.holiday]}>
                {hijriDay}
              </Text>

              {/* English Date */}
              <Text style={[styles.english, isWeekend && styles.holiday]}>
                {englishDay}
              </Text>

              {/* Bangla Date Placeholder */}
              <Text style={[styles.bangla, isWeekend && styles.holiday]}>
                বাংলা
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },

  dayCell: {
    width: 42,
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },

  hijri: {
    fontSize: 10,
    color: '#16A34A',
  },

  english: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  bangla: {
    fontSize: 10,
    color: '#16A34A',
  },

  holiday: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
});
