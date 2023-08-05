import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { fallbackPersonImage, image185 } from '../api/moviedb';

export default function Cast({ cast, navigation }) {
  return (
    <View className='my-6'>
      <Text className='mx-4 mb-5 text-lg text-white'>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Person', person)}
                className='items-center mr-4'
              >
                <View className='items-center w-20 h-20 overflow-hidden border rounded-full border-neutral-500'>
                  <Image
                    className='w-20 h-24 rounded-2xl'
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>

                <Text className='mt-1 text-xs text-white'>
                  {person?.character.length > 10
                    ? person.character.slice(0, 10) + '...'
                    : person?.character}
                </Text>
                <Text className='text-xs text-neutral-400'>
                  {person?.original_name.length > 10
                    ? person.original_name.slice(0, 10) + '...'
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
