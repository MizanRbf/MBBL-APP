import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment-hijri';
import { toBanglaNumber } from '../utils/bengaliNumber';

const banglaMonths = [
  'বৈশাখ',
  'জ্যৈষ্ঠ',
  'আষাঢ়',
  'শ্রাবণ',
  'ভাদ্র',
  'আশ্বিন',
  'কার্তিক',
  'অগ্রহায়ণ',
  'পৌষ',
  'মাঘ',
  'ফাল্গুন',
  'চৈত্র',
];

// হিজরি মাসের বাংলা নামসমূহ
const hijriMonthsBangla: { [key: string]: string } = {
  Muharram: 'মুহাররম',
  Safar: 'সফর',
  "Rabi' al-Awwal": 'রবিউল আউয়াল',
  "Rabi' al-Thani": 'রবিউস সানি',
  'Jumada al-Awwal': 'জুমাদাল উলা',
  'Jumada al-Thani': 'জুমাদাস সানি',
  Rajab: 'রজব',
  "Sha'ban": 'শাবান',
  Ramadan: 'রমজান',
  Shawwal: 'শাওয়াল',
  "Dhu al-Qi'dah": 'জিলকদ',
  'Dhu al-Hijjah': 'জিলহজ',
};

// নিখুঁত বাংলা তারিখ ও মাস বের করার ফাংশন
const getBanglaDateAndMonth = (dateString: string) => {
  const m = moment(dateString);
  const day = m.date();
  const monthIdx = m.month();

  let banglaMonthIndex = (monthIdx + 8) % 12;
  if (day < 14) {
    banglaMonthIndex = (banglaMonthIndex - 1 + 12) % 12;
  }

  return {
    monthName: banglaMonths[banglaMonthIndex],
    year: toBanglaNumber(m.year() - 593),
  };
};

export default function CalendarScreen() {
  const [currentMonthStr, setCurrentMonthStr] = useState(
    moment().format('YYYY-MM-DD'),
  );

  const currentMoment = moment(currentMonthStr);
  const englishMonthYear = currentMoment.format('MMMM YYYY');
  const banglaData = getBanglaDateAndMonth(currentMonthStr);

  // iMMMM দিয়ে সরাসরি ইংরেজি নাম (যেমন: Ramadan) পাওয়া যায়
  const hijriMonthEng = currentMoment.format('MMMM');
  const hijriYear = toBanglaNumber(currentMoment.format('YYYY'));

  // 'i' রিমুভ করার অতিরিক্ত লজিকটি বাদ দিয়ে সরাসরি ম্যাপ করা হলো
  const hijriMonthBanglaName =
    hijriMonthsBangla[hijriMonthEng] || hijriMonthEng;

  const changeMonth = (direction: 'prev' | 'next') => {
    const nextMonth = moment(currentMonthStr).add(
      direction === 'prev' ? -1 : 1,
      'months',
    );
    setCurrentMonthStr(nextMonth.format('YYYY-MM-DD'));
  };

  return (
    <View style={styles.container}>
      {/* ১. কাস্টম মাল্টি-ক্যালেন্ডার হেডার */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => changeMonth('prev')}
          style={styles.arrowButton}
        >
          <Text style={styles.arrowText}>◀</Text>
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.engMonthText}>{englishMonthYear}</Text>
          <Text style={styles.subMonthText}>
            {banglaData.monthName} {banglaData.year} ❖ {hijriMonthBanglaName}{' '}
            {hijriYear} হিজরি
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => changeMonth('next')}
          style={styles.arrowButton}
        >
          <Text style={styles.arrowText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* ২. লিজেন্ড / কালার কোড */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.colorDot, { backgroundColor: '#059669' }]} />
          <Text style={styles.legendText}>বাংলা</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorDot, { backgroundColor: '#2563EB' }]} />
          <Text style={styles.legendText}>ইংরেজি</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorDot, { backgroundColor: '#D97706' }]} />
          <Text style={styles.legendText}>হিজরি</Text>
        </View>
      </View>

      {/* ৩. ক্যালেন্ডার কোর */}
      <Calendar
        key={currentMonthStr}
        current={currentMonthStr}
        hideArrows={true}
        renderHeader={() => null}
        onMonthChange={month => {
          setCurrentMonthStr(month.dateString);
        }}
        theme={{
          textSectionTitleColor: '#2563EB',
        }}
        dayComponent={({ date, state }) => {
          if (!date) return null;

          const m = moment(date.dateString);
          const englishDay = m.format('D');

          // বাংলা তারিখ লজিক
          const d = new Date(date.dateString);
          let banglaDayNum = d.getDate() - 13;
          if (banglaDayNum <= 0) {
            banglaDayNum = 30 + banglaDayNum;
          }

          // D দিয়ে শুধুমাত্র পিওর হিজরি সংখ্যা নেওয়া হয়েছে
          const hijriDay = toBanglaNumber(m.format('D'));
          const dayOfWeek = d.getDay();
          const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
          const isDisabled = state === 'disabled';

          return (
            <View style={[styles.dayCell, isDisabled && styles.disabledCell]}>
              <Text
                style={[
                  styles.bangla,
                  isWeekend && styles.holiday,
                  isDisabled && styles.disabledText,
                ]}
              >
                {toBanglaNumber(banglaDayNum)}
              </Text>

              <Text
                style={[
                  styles.english,
                  isWeekend && styles.holiday,
                  isDisabled && styles.disabledText,
                ]}
              >
                {toBanglaNumber(englishDay)}
              </Text>

              <Text
                style={[
                  styles.hijri,
                  isWeekend && styles.holiday,
                  isDisabled && styles.disabledText,
                ]}
              >
                {hijriDay}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitleContainer: { alignItems: 'center' },
  engMonthText: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  subMonthText: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 2,
    fontWeight: '500',
  },
  arrowButton: { padding: 10 },
  arrowText: { fontSize: 16, color: '#2563EB' },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  colorDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 11, fontWeight: '600', color: '#4B5563' },
  dayCell: {
    width: 46,
    height: 65,
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderWidth: 0.3,
    borderColor: '#E5E7EB',
  },
  disabledCell: { opacity: 0.3 },
  bangla: {
    fontSize: 9,
    fontWeight: '700',
    color: '#059669',
    alignSelf: 'flex-start',
  },
  english: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563EB',
    alignSelf: 'center',
  },
  hijri: {
    fontSize: 9,
    fontWeight: '700',
    color: '#D97706',
    alignSelf: 'flex-end',
  },
  holiday: { color: '#DC2626' },
  disabledText: { color: '#9CA3AF' },
});
