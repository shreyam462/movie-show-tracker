import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchMovieDetails, addToMyList } from '../services/api';

const DetailsScreen = ({ route }) => {
    const { id } = route.params; // Get the movie ID passed from the navigation
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch movie details on mount
        fetchMovieDetails(id)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const handleAddToList = (status) => {
        if (!movie) return;

        // Call the Add to List API
        addToMyList(movie.id, status)
            .then(() => {
                Alert.alert(
                    'Success',
                    `Movie added to "${status}" list.`,
                    [{ text: 'OK' }],
                    { cancelable: true }
                );
            })
            .catch((error) => {
                console.error('Error adding to list:', error);
                Alert.alert(
                    'Error',
                    'Failed to add the movie to the list. Please try again later.',
                    [{ text: 'OK' }],
                    { cancelable: true }
                );
            });
    };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loading} />;
    }

    if (!movie) {
        return <Text style={styles.error}>Movie not found!</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text>{movie.description}</Text>
            <Button title="Add to Watched" onPress={() => handleAddToList('Watched')} />
            <Button title="Add to To Watch" onPress={() => handleAddToList('To Watch')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
    error: {
        textAlign: 'center',
        marginTop: 20,
    },
});

export default DetailsScreen;
