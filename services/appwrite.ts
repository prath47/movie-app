import { Client, Databases, ID, Query } from "react-native-appwrite";
// track the searches made by user

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const dataBase = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await dataBase.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await dataBase.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await dataBase.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://tmdb.org/t/p/w500${movie.poster_path}`
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async () : Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await dataBase.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderAsc("count"),
            Query.limit(10),
        ]);
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        throw error;
    }
}