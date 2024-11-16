import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const MovieCard = ({ movie, onPress, isGrid }) => {
    return (
        <TouchableOpacity
            style={[styles.card, isGrid ? styles.gridCard : styles.listCard]}
            onPress={() => onPress(movie.id)}
        >
            <Image
                source={{ uri: movie.poster_url }}
                style={isGrid ? styles.gridPoster : styles.listPoster}
                resizeMode="cover"
            />
            <View style={isGrid ? styles.gridInfo : styles.listInfo}>
                <Text style={styles.title}>{movie.title}</Text>
                {movie.type && <Text style={styles.type}>{movie.type.toUpperCase()}</Text>}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        elevation: 2,
        marginVertical: 8,
        marginHorizontal: 4,
        overflow: 'hidden',
    },
    gridCard: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
    },
    listCard: {
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center',
    },
    gridPoster: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    listPoster: {
        width: 150,
        height: 100,
        borderRadius: 8,
        marginRight: 16,
    },
    gridInfo: {
        alignItems: 'center',
    },
    listInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    type: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
});

export default MovieCard;
