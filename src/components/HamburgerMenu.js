import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const HamburgerMenu = () => {
    const handleMenuPress = () => {
        Alert.alert('Menu', 'Hamburger menu clicked!');
    };

    return (
        <TouchableOpacity onPress={handleMenuPress} style={styles.container}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    line: {
        height: 3,
        backgroundColor: '#000',
        marginVertical: 2,
        width: 25,
    },
});

export default HamburgerMenu;
