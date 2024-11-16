import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    TextInput,
    StyleSheet,
    Text,
    ActivityIndicator,
    Button,
} from 'react-native';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import GridToggle from '../components/GridToggle';

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isGrid, setIsGrid] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch movies on mount
    useEffect(() => {
        fetchMovies()
            .then((response) => {
                setMovies(response.data);
                setFilteredMovies(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
                setLoading(false);
            });
    }, []);

    // Handle search functionality
    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    // Sort alphabetically
    const handleSort = () => {
        setFilteredMovies((prev) =>
            [...prev].sort((a, b) => a.title.localeCompare(b.title))
        );
    };

    // Filter by type (movie/show)
    const handleFilter = (type) => {
        setFilteredMovies(movies.filter((movie) => movie.type === type));
    };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loading} />;
    }

    return (
        <View style={styles.container}>
            {/* Search Input */}
            <TextInput
                style={styles.input}
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {/* Sort and Filter Buttons */}
            <View style={styles.buttons}>
                <Button title="Sort A-Z" onPress={handleSort} />
                <Button title="Filter Movies" onPress={() => handleFilter('movie')} />
                <Button title="Filter Shows" onPress={() => handleFilter('show')} />
            </View>

            {/* Grid/List Toggle */}
            <GridToggle isGrid={isGrid} onToggle={() => setIsGrid((prev) => !prev)} />

            {/* Movie List/Grid */}
            <FlatList
                data={filteredMovies}
                key={isGrid ? 'grid' : 'list'} // Forces re-render when layout changes
                numColumns={isGrid ? 2 : 1} // Toggles between grid and list layout
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        movie={item}
                        isGrid={isGrid} // Pass layout type to MovieCard for styling
                        onPress={() => navigation.navigate('Details', { id: item.id })}
                    />
                )}
            />
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default HomeScreen;
