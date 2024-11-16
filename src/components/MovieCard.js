import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie, onPress, isGrid }) => (
    <TouchableOpacity style={[styles.card, isGrid && styles.gridCard]} onPress={onPress}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>{movie.type.toUpperCase()}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        elevation: 2,
    },
    gridCard: {
        flex: 0.5, // Adjust card size for grid layout
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MovieCard;
