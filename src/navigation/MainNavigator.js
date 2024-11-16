import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MyListScreen from '../screens/MyListScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Header = ({ navigation }) => (
    <View style={styles.header}>
        {/* Hamburger Menu */}
        <TouchableOpacity onPress={() => alert('Hamburger Menu Clicked')}>
            <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>

        {/* App Name */}
        <Text style={styles.headerTitle}>Movie Tracker</Text>

        {/* Profile Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
    </View>
);

const HomeStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            header: ({ navigation }) => <Header navigation={navigation} />,
        }}
    >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);

const MyListStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            header: ({ navigation }) => <Header navigation={navigation} />,
        }}
    >
        <Stack.Screen name="My List" component={MyListScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);

const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="My List" component={MyListStackNavigator} />
    </Tab.Navigator>
);

const MainNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    hamburger: {
        fontSize: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileIcon: {
        fontSize: 24,
    },
});

export default MainNavigator;
