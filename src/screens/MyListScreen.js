import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
    Alert,
} from 'react-native';
import GridToggle from '../components/GridToggle';
import MovieCard from '../components/MovieCard';
import { fetchMyList } from '../services/api'; // Import the API function

const MyListScreen = ({ navigation }) => {
    const [myList, setMyList] = useState({ Watched: [], ToWatch: [] });
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isGrid, setIsGrid] = useState(false);

    const getMyList = async () => {
        try {
            setLoading(true);
            const data = await fetchMyList(); // Fetch the list from the API
            setMyList({
                Watched: data.Watched,
                ToWatch: data['To Watch'],
            });
        } catch (error) {
            console.error('Error fetching my list:', error);
            Alert.alert('Error', 'Failed to fetch the list. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyList();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await getMyList(); // Refresh the list
        setRefreshing(false);
    };

    const renderList = (title, data) => (
        <>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={data}
                key={isGrid ? 'grid' : 'list'}
                numColumns={isGrid ? 2 : 1}
                keyExtractor={(item) => item.movieId.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        movie={{
                            id: item.movieId,
                            title: item.title,
                            poster_url: item.poster_url,
                        }}
                        onPress={() => navigation.navigate('Details', { id: item.movieId })}
                        isGrid={isGrid}
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text>Loading your list...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Grid/List Toggle */}
            <GridToggle isGrid={isGrid} onToggle={() => setIsGrid((prev) => !prev)} />

            {/* Render Watched and To Watch Lists */}
            {renderList('Watched', myList.Watched)}
            {renderList('To Watch', myList.ToWatch)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyListScreen;
