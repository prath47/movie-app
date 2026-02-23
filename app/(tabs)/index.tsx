import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import MovieCard from "../../components/MovieCard";
import SearchBar from "../../components/SearchBar";
import TrendingCard from "../../components/TrendingCard";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { fetchMovies } from "../../services/api";
import { getTrendingMovies } from "../../services/appwrite";
import useFetch from "../../services/useFetch";
import "../global.css";

import Skeleton from "../../components/Skeleton";

export default function Index() {
  const route = useRouter();

  const {
    data: trendingMovies,
    loading: loadingTrendingMovies,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: loadingMovies,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0 " />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="px-5"
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto "
            />
            {loadingMovies || loadingTrendingMovies ? (
              <View className="mt-5">
                <Skeleton width="100%" height={50} style={{ marginBottom: 40 }} />
                <Skeleton width={150} height={25} style={{ marginBottom: 15 }} />
                <View className="flex-row gap-4 mb-10">
                  <Skeleton width={120} height={180} />
                  <Skeleton width={120} height={180} />
                  <Skeleton width={120} height={180} />
                </View>
                <Skeleton width={150} height={25} style={{ marginBottom: 15 }} />
                <View className="flex-row flex-wrap gap-5">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} width="30%" height={150} />
                  ))}
                </View>
              </View>
            ) : moviesError || trendingMoviesError ? (
              <Text className="text-white text-center mt-10">
                {moviesError?.message || trendingMoviesError?.message}
              </Text>
            ) : (
              <View className="flex-1 mt-5">
                <SearchBar
                  onPress={() => {
                    route.push("/search");
                  }}
                  placeholder="Search for a movie"
                />

                {trendingMovies && (
                  <View className="mt-10 ">
                    <Text className="text-lg text-white font-bold mb-3">
                      Trending Movies
                    </Text>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      ItemSeparatorComponent={() => <View className="w-4" />}
                      className="mb-4 mt-3"
                      data={trendingMovies}
                      renderItem={({ item, index }) => (
                        <TrendingCard movie={item} index={index} />
                      )}
                      keyExtractor={(item, index) => `${item.movie_id}-${index}`}
                    />
                  </View>
                )}

                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Latest Movies
                </Text>
              </View>
            )}
          </>
        }
      />
    </View>
  );
}
