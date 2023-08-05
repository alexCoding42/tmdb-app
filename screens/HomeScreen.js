import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import { fetchTrendingMovies } from '../api/moviedb';
import TrendingMovies from '../components/trendingMovies';
import Loading from '../components/loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log('got trending', data.results.length);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  return (
    <View className='flex-1 bg-neutral-800'>
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style='light' />
        <View className='flex-row items-center justify-between mx-4'>
          <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
          <Text className='text-3xl font-bold text-white'>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies Carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}
        </ScrollView>
      )}
    </View>
  );
}
