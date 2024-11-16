import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import { fetchMovieDetails } from '../services/api';

const DetailsScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState(null); // Tracks the selected status

    useEffect(() => {
        fetchMovieDetails(id)
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleStatusChange = (status) => {
        if (selectedStatus === status) {
            setSelectedStatus(null);
            Alert.alert('Status Updated', 'Removed from list.', [{ text: 'OK' }]);
        } else {
            setSelectedStatus(status);
            Alert.alert('Status Updated', `Added to "${status}" List.`, [{ text: 'OK' }]);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" style={styles.loading} />;
    }

    if (!movie) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Movie not found!</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Back Button with Icon */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#007bff" />
            </TouchableOpacity>

            <Image source={{ uri: movie.poster_url }} style={styles.poster} />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.info}>Genre: {movie.genre.join(', ')}</Text>
            <Text style={styles.info}>Release Date: {movie.release_date}</Text>
            <Text style={styles.info}>Rating: {movie.rating}/10</Text>
            <Text style={styles.description}>{movie.description}</Text>

            {/* Status Toggle Buttons */}
            <View style={styles.statusContainer}>
                <TouchableOpacity
                    style={[
                        styles.statusButton,
                        selectedStatus === 'Watched' && styles.activeButton,
                    ]}
                    onPress={() => handleStatusChange('Watched')}
                >
                    <Text style={styles.buttonText}>Watched</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.statusButton,
                        selectedStatus === 'To Watch' && styles.activeButton,
                    ]}
                    onPress={() => handleStatusChange('To Watch')}
                >
                    <Text style={styles.buttonText}>To Watch</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    poster: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 4,
    },
    description: {
        fontSize: 16,
        marginVertical: 16,
        lineHeight: 24,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    statusButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: '#ccc',
    },
    activeButton: {
        backgroundColor: '#007bff',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginBottom: 16,
    },
});

export default DetailsScreen;
