import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Alert,
    TouchableOpacity,
    Text,
} from 'react-native';
import { fetchMovies } from '../services/api'; // API function to fetch movies
import GridToggle from '../components/GridToggle'; // Grid/List toggle component
import MovieCard from '../components/MovieCard'; // MovieCard component

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isGrid, setIsGrid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isSorted, setIsSorted] = useState(false); // Tracks sorting state
    const [filterType, setFilterType] = useState(null); // Tracks filter: 'movie', 'show', or null

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
        await getMovies(); // Refresh the movies
        setRefreshing(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        applyFilters(query, filterType); // Apply search and filter together
    };

    const handleSort = () => {
        if (isSorted) {
            // Undo sort: reset to original list
            applyFilters(searchQuery, filterType, [...movies]);
            setIsSorted(false);
        } else {
            // Sort the list alphabetically
            setFilteredMovies((prev) =>
                [...prev].sort((a, b) => a.title.localeCompare(b.title))
            );
            setIsSorted(true);
        }
    };

    const handleFilter = (type) => {
        const newFilter = filterType === type ? null : type; // Toggle the filter
        setFilterType(newFilter);
        applyFilters(searchQuery, newFilter); // Apply search and filter together
    };

    const applyFilters = (search, filter, baseMovies = movies) => {
        let filtered = baseMovies;

        if (search) {
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filter) {
            filtered = filtered.filter((movie) => movie.type === filter);
        }

        setFilteredMovies(filtered);
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.input}
                placeholder="Search movies and shows..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Sort and Filter Buttons */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, isSorted && styles.activeButton]}
                    onPress={handleSort}
                >
                    <Text style={styles.buttonText}>
                        {isSorted ? 'Sort A-Z' : 'Sort A-Z'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filterType === 'movie' && styles.activeButton,
                    ]}
                    onPress={() => handleFilter('movie')}
                >
                    <Text style={styles.buttonText}>Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        filterType === 'show' && styles.activeButton,
                    ]}
                    onPress={() => handleFilter('show')}
                >
                    <Text style={styles.buttonText}>Shows</Text>
                </TouchableOpacity>
            </View>

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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    filterButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 4,
        backgroundColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
