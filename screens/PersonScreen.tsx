import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";
import Loading from "../components/loading";
import { styles } from "../theme";
import { IPerson } from "../types";

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";
var { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState<IPerson>({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    console.log("got person details");
    setLoading(false);
    if (data) {
      setPerson(data);
    }
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    console.log("got person movies");
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          "flex-row justify-between items-center mx-4 z-10 " + verticalMargin
        }
      >
        <TouchableOpacity
          style={styles.background}
          className="p-1 rounded-xl"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center overflow-hidden border-2 rounded-full h-72 w-72 border-neutral-500">
              <Image
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl font-bold text-center text-white">
              {person?.name}
            </Text>
            <Text className="text-base text-center text-neutral-500">
              {person?.place_of_birth}
            </Text>
          </View>

          <View className="flex-row items-center justify-between p-4 mx-3 mt-6 rounded-full bg-neutral-700 ">
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-white ">Gender</Text>
              <Text className="text-sm text-neutral-300">
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-white">Birthday</Text>
              <Text className="text-sm text-neutral-300">
                {person?.birthday}
              </Text>
            </View>
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-white">known for</Text>
              <Text className="text-sm text-neutral-300">
                {person?.known_for_department}
              </Text>
            </View>
            <View className="items-center px-2">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="text-sm text-neutral-300">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="mx-4 my-6 space-y-2">
            <Text className="text-lg text-white">Biography</Text>
            <Text className="tracking-wide text-neutral-400">
              {person?.biography ? person.biography : "N/A"}
            </Text>
          </View>

          {person?.id && personMovies.length > 0 && (
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}
