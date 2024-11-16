import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Back Icon */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#007bff" />
            </TouchableOpacity>

            <Text style={styles.title}>User Profile</Text>
            <Text style={styles.subtitle}>Name: John Doe</Text>
            <Text style={styles.subtitle}>Email: johndoe@example.com</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    backButton: {
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
});

export default ProfileScreen;
