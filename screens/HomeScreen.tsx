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
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import MovieList from '../components/movieList';
import TrendingMovies from '../components/trendingMovies';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
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
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title='Upcoming' data={upcoming} />
          )}
          {/* top rated movies row */}
          {topRated.length > 0 && (
            <MovieList title='Top Rated' data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
