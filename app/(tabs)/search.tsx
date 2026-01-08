import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../../components/MovieCard";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { fetchMovies } from "../../services/api";
import { updateSearchCount } from "../../services/appwrite";
import useFetch from "../../services/useFetch";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
 
  const {
    data: movies,
    loading: loadingMovies,
    error: moviesError,
    refetch,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    updateSearchCount(searchQuery, movies[0]);

    const timeoutId = setTimeout(() => {
      if(searchQuery.trim()) {
        refetch();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0 flex-1"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-20 mb-5">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar 
              placeholder="Search Movie..."
              value={searchQuery}
              onChangeText={(text: string ) => setSearchQuery(text)}
              />
            </View>

            {loadingMovies && (
              <ActivityIndicator
                size="large"
                color="#0000fff"
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError.message}
              </Text>
            )}

            {!loadingMovies &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search result for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        // @ts-ignore
        ListEmptyComponent={
          !loadingMovies && !moviesError && searchQuery.trim() && movies?.length === 0 && (
            <Text className="text-white text-center mt-10">
              No movies found for {'"'} {searchQuery} {'"'}
            </Text>
          )
        }
      />
    </View>
  );
};

export default Search;
