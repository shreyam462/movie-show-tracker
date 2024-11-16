import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Alert,
    Text, // Import Text here
} from 'react-native';
import { fetchMovies } from '../services/api'; // Ensure this API function exists
import GridToggle from '../components/GridToggle'; // Ensure this component is implemented
import MovieCard from '../components/MovieCard'; // Ensure this component is implemented

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isGrid, setIsGrid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getMovies = async () => {
        try {
            setLoading(true);
            const response = await fetchMovies(); // Fetch movies from the API
            setMovies(response.data);
            setFilteredMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            Alert.alert('Error', 'Failed to fetch movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await getMovies(); // Refresh the movies by re-fetching them
        setRefreshing(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.input}
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Grid/List Toggle */}
            <GridToggle isGrid={isGrid} onToggle={() => setIsGrid((prev) => !prev)} />

            {/* Movie List */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                    <Text>Loading Home Page...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredMovies}
                    key={isGrid ? 'grid' : 'list'} // Rerender when layout changes
                    numColumns={isGrid ? 2 : 1}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <MovieCard
                            movie={item}
                            isGrid={isGrid}
                            onPress={() => navigation.navigate('Details', { id: item.id })}
                        />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
