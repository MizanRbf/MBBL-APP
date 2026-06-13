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

    // ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
    const toBanglaNum = (numStr: string | number) =>
      numStr
        .toString()
        .split('')
        .map(digit => banglaNumbers[parseInt(digit)] || digit)
        .join('');

    // হিজরি মাসের ইংরেজি নামের সাথে বাংলা নামের তালিকা
    const hijriMonthsBn: { [key: string]: string } = {
      muharram: 'মুহাররম',
      safar: 'সফর',
      'rabi i': 'রবিউল আউয়াল',
      'rabi ii': 'রবিউস সানি',
      'jumada i': 'জুমাদাল উলা',
      'jumada ii': 'জুমাদাস সানি',
      rajab: 'রজব',
      shaban: 'শাবান',
      ramadan: 'রমজান',
      shawwal: 'শাওয়াল',
      dhulqidah: 'জিলকদ',
      dhulhijjah: 'জিলহজ', // এখানে Dhulhijjah বা Dhuʻl-Hijjah থাকলে সরাসরি "জিলহজ" হয়ে যাবে
    };

    // সিস্টেম থেকে হিজরি টেক্সট নেওয়া (যেমন: "25 Dhuʻl-Hijjah 1447 AH")
    const rawHijri = dateObj.toLocaleDateString('en-US-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const cleanHijri = rawHijri.replace(' AH', '');
    const parts = cleanHijri.split(' ');

    if (parts.length >= 3) {
      const hDay = parts[0];
      const hYear = parts[parts.length - 1];

      // মাঝের মাসের নাম থেকে স্পেশাল ক্যারেক্টার ও স্পেস মুছে ছোট হাতের অক্ষরে রূপান্তর
      const rawMonthEn = parts.slice(1, parts.length - 1).join(' ');
      const cleanMonthKey = rawMonthEn.toLowerCase().replace(/[^a-z0-9]/g, '');

      // রবিউল আউয়াল ও সানির জন্য স্পেশাল চেক
      let hMonthBn = '';
      if (
        cleanMonthKey.includes('rabii') &&
        !cleanMonthKey.includes('rabiii')
      ) {
        hMonthBn = hijriMonthsBn['rabi i'];
      } else if (cleanMonthKey.includes('rabiii')) {
        hMonthBn = hijriMonthsBn['rabi ii'];
      } else {
        hMonthBn = hijriMonthsBn[cleanMonthKey] || rawMonthEn;
      }

      return `${toBanglaNum(hDay)} ${hMonthBn} ${toBanglaNum(hYear)} হিজরি`;
    }

    return rawHijri;
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
    const toBanglaNum = (num: number) =>
      num
        .toString()
        .split('')
        .map(digit => banglaNumbers[parseInt(digit)] || digit)
        .join('');

    const dayNum = dateObj.getDate();
    const monthNum = dateObj.getMonth();
    const yearNum = dateObj.getFullYear();

    let bDay = dayNum;
    let bMonthIndex = 0;
    let bYear = yearNum - 593;

    const transitionDays = [14, 14, 15, 14, 15, 16, 16, 16, 16, 15, 15, 14];

    if (monthNum < 3 || (monthNum === 3 && dayNum < 14)) {
      bYear -= 1;
    }

    if (dayNum >= transitionDays[monthNum]) {
      bMonthIndex = (monthNum + 9) % 12;
      bDay = dayNum - transitionDays[monthNum] + 1;
    } else {
      bMonthIndex = (monthNum + 8) % 12;
      const prevMonthDays = new Date(yearNum, monthNum, 0).getDate();
      bDay =
        prevMonthDays - transitionDays[(monthNum - 1 + 12) % 12] + dayNum + 1;
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
