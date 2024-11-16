import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const GridToggle = ({ isGrid, onToggle }) => (
    <View style={styles.container}>
        <Text>Grid View</Text>
        <Switch value={isGrid} onValueChange={onToggle} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
});

export default GridToggle;
