import React, { useContext, useState } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { AppContext } from '../contexts/AppContext';
import GridToggle from '../components/GridToggle';
import MovieCard from '../components/MovieCard';

const MyListScreen = ({ navigation }) => {
    const { myList } = useContext(AppContext); // Fetch Watched and To Watch lists from context
    const [refreshing, setRefreshing] = useState(false);
    const [isGrid, setIsGrid] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate refresh (replace with actual API call if needed)
        setTimeout(() => setRefreshing(false), 1000);
    };

    const renderList = (title, data) => (
        <>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={data}
                key={isGrid ? 'grid' : 'list'}
                numColumns={isGrid ? 2 : 1}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MovieCard
                        movie={item}
                        onPress={() => navigation.navigate('Details', { id: item.id })}
                        isGrid={isGrid}
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </>
    );

    return (
        <View style={styles.container}>
            {/* Grid/List Toggle */}
            <GridToggle isGrid={isGrid} onToggle={() => setIsGrid((prev) => !prev)} />

            {/* Render Watched and To Watch Lists */}
            {renderList('Watched', myList.watched)}
            {renderList('To Watch', myList.toWatch)}
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
});

export default MyListScreen;
