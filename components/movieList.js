import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
import { styles } from '../theme';
const { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data }) {
  const navigation = useNavigation();
  return (
    <View className='mb-8 space-y-4'>
      <View className='flex-row items-center justify-between mx-4'>
        <Text className='text-lg text-white'>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className='text-lg'>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}
            >
              <View className='mr-4 space-y-1'>
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  className='rounded-3xl'
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className='ml-1 text-neutral-300'>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
