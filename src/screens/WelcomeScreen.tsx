import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Footer from '../components/Footer';

export default function WelcomeScreen({ navigation }: any) {
  // useState
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // গ্রেগরিয়ান দিন ও তারিখ
  const day = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const date = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // সময় (ঘড়ি)
  const time = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  // --- সংখ্যা ও হিজরি মাস বাংলায় কনভার্ট করার লজিক ---
  const getBanglaHijriDate = (dateObj: Date) => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    const toBanglaNum = (num: string | number) =>
      num.toString().replace(/\d/g, d => banglaNumbers[+d]);

    const hijriMonthsBn: Record<string, string> = {
      muharram: 'মুহাররম',
      safar: 'সফর',
      'rabi al-awwal': 'রবিউল আউয়াল',
      'rabi al-thani': 'রবিউস সানি',
      'jumada al-awwal': 'জুমাদাল উলা',
      'jumada al-thani': 'জুমাদাস সানি',
      rajab: 'রজব',
      shaban: 'শাবান',
      ramadan: 'রমজান',
      shawwal: 'শাওয়াল',
      'dhu al-qidah': 'জিলকদ',
      'dhu al-hijjah': 'জিলহজ',
    };

    const raw = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(dateObj);

    // 🔥 IMPORTANT FIX: handle comma format too
    // Example: "Dhul-Hijjah 29, 1447 AH"
    const cleaned = raw.replace(' AH', '').replace(',', '');

    const parts = cleaned.split(' ');

    // find number in array
    const numbers = parts.filter(p => /^\d+$/.test(p));

    const day = numbers[0];
    const year = numbers[numbers.length - 1];

    const monthRaw = parts
      .filter(p => isNaN(Number(p)))
      .join(' ')
      .trim();

    const cleanMonth = monthRaw
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    let mappedMonth = cleanMonth;

    if (cleanMonth.includes('hijjah')) {
      mappedMonth = 'dhu al-hijjah';
    } else if (cleanMonth.includes('qidah')) {
      mappedMonth = 'dhu al-qidah';
    }

    return `${toBanglaNum(day)} ${
      hijriMonthsBn[mappedMonth] || monthRaw
    }, ${toBanglaNum(year)} হিজরি`;
  };

  const hijriDateBn = getBanglaHijriDate(currentTime);

  // বাংলা সন বের করার লজিক (বঙ্গাব্দ)
  const getBanglaDate = (dateObj: Date) => {
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
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    const toBanglaNum = (num: number | string) =>
      num
        .toString()
        .split('')
        .map(digit => banglaNumbers[parseInt(digit)] || digit)
        .join('');

    const dayNum = dateObj.getDate();
    const monthNum = dateObj.getMonth(); // 0 = January, 1 = February, etc.
    const yearNum = dateObj.getFullYear();

    let bDay = 1;
    let bMonthIndex = 0;
    let bYear = yearNum - 593;

    // লিপইয়ার (অধিবর্ষ) চেক করার লজিক (ফাল্গুন মাসের দিনের জন্য প্রয়োজন)
    const isLeapYear = (year: number) => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    // ১৪ এপ্রিলের আগে হলে বঙ্গাব্দ ১ বছর পিছিয়ে থাকবে
    if (monthNum < 3 || (monthNum === 3 && dayNum < 14)) {
      bYear -= 1;
    }

    // মাস এবং তারিখ অনুযায়ী অফিশিয়াল ম্যাপিং (Fixed Dates)
    switch (monthNum) {
      case 0: // January
        if (dayNum <= 14) {
          {
            bMonthIndex = 8;
            bDay = dayNum + 17;
          }
        } // পৌষ
        else {
          bMonthIndex = 9;
          bDay = dayNum - 14;
        } // মাঘ
        break;
      case 1: // February
        if (dayNum <= 13) {
          bMonthIndex = 9;
          bDay = dayNum + 17;
        } // মাঘ
        else {
          bMonthIndex = 10;
          bDay = dayNum - 13;
        } // ফাল্গুন
        break;
      case 2: // March
        // লিপইয়ার হলে ফাল্গুন ৩১ দিনে হয়, সাধারণ বছরে ৩০ দিনে
        const springTransition = isLeapYear(yearNum) ? 14 : 15;
        if (dayNum < springTransition) {
          bMonthIndex = 10;
          bDay = dayNum + (isLeapYear(yearNum) ? 17 : 16); // ফাল্গুন
        } else {
          bMonthIndex = 11;
          bDay = dayNum - springTransition + 1; // চৈত্র
        }
        break;
      case 3: // April
        if (dayNum <= 13) {
          bMonthIndex = 11;
          bDay = dayNum + 17;
        } // চৈত্র
        else {
          bMonthIndex = 0;
          bDay = dayNum - 13;
        } // বৈশাখ (১৪ এপ্রিল = ১ বৈশাখ)
        break;
      case 4: // May
        if (dayNum <= 14) {
          bMonthIndex = 0;
          bDay = dayNum + 17;
        } // বৈশাখ
        else {
          bMonthIndex = 1;
          bDay = dayNum - 14;
        } // জ্যৈষ্ঠ
        break;
      case 5: // June
        if (dayNum <= 14) {
          bMonthIndex = 1;
          bDay = dayNum + 17;
        } // জ্যৈষ্ঠ
        else {
          bMonthIndex = 2;
          bDay = dayNum - 14;
        } // আষাঢ় (১৫ জুন = ১ আষাঢ়)
        break;
      case 6: // July
        if (dayNum <= 15) {
          bMonthIndex = 2;
          bDay = dayNum + 16;
        } // আষাঢ়
        else {
          bMonthIndex = 3;
          bDay = dayNum - 15;
        } // শ্রাবণ
        break;
      case 7: // August
        if (dayNum <= 15) {
          bMonthIndex = 3;
          bDay = dayNum + 16;
        } // শ্রাবণ
        else {
          bMonthIndex = 4;
          bDay = dayNum - 15;
        } // ভাদ্র
        break;
      case 8: // September
        if (dayNum <= 15) {
          bMonthIndex = 4;
          bDay = dayNum + 16;
        } // ভাদ্র
        else {
          bMonthIndex = 5;
          bDay = dayNum - 15;
        } // আশ্বিন
        break;
      case 9: // October
        if (dayNum <= 15) {
          bMonthIndex = 5;
          bDay = dayNum + 15;
        } // আশ্বিন
        else {
          bMonthIndex = 6;
          bDay = dayNum - 15;
        } // কার্তিক
        break;
      case 10: // November
        if (dayNum <= 14) {
          bMonthIndex = 6;
          bDay = dayNum + 16;
        } // কার্তিক
        else {
          bMonthIndex = 7;
          bDay = dayNum - 14;
        } // অগ্রহায়ণ
        break;
      case 11: // December
        if (dayNum <= 14) {
          bMonthIndex = 7;
          bDay = dayNum + 16;
        } // অগ্রহায়ণ
        else {
          bMonthIndex = 8;
          bDay = dayNum - 14;
        } // পৌষ
        break;
    }

    return `${toBanglaNum(bDay)} ${banglaMonths[bMonthIndex]}, ${toBanglaNum(
      bYear,
    )} বঙ্গাব্দ`;
  };

  const banglaDate = getBanglaDate(currentTime);

  return (
    <LinearGradient colors={['#F6FFDC', '#FFFFFF']} style={styles.container}>
      {/* Date and Time */}
      <View style={styles.dateContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.dayText}>{day}</Text>
        <Text style={styles.dateText}>{date}</Text>

        <Text style={styles.altDateText}>🌙 {hijriDateBn}</Text>
        <Text style={styles.altDateText}>🌾 {banglaDate}</Text>
      </View>

      {/* Logo and Title */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Mizan's Brain Boost Lab</Text>
        </View>

        <Text style={styles.subtitle}>All in One Application</Text>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Tap to Start</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Footer />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  dayText: {
    fontSize: 22,
    color: '#48A111',
    fontWeight: '600',
  },
  dateText: {
    fontSize: 18,
    color: '#6B7280',
    marginTop: 5,
    marginBottom: 6,
  },
  altDateText: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#48A111',
    marginTop: 12,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startButton: {
    marginTop: 30,
    backgroundColor: '#48A111',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 25,
    fontFamily: 'EduAUVICWANTDots-Regular',
    fontWeight: 'bold',
    color: '#48A111',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
    width: '100%',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#6B7280',
  },
});
