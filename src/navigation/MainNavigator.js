import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import MyListScreen from '../screens/MyListScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { TouchableOpacity, View, StyleSheet, Text, SafeAreaView } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Header Component
const Header = ({ navigation }) => (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => alert('Hamburger Menu Clicked')}>
            <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Movies & Shows Tracker</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
);

// Home Stack Navigator
const HomeStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
                header: () => <Header navigation={navigation} />,
            })}
        />
        <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ navigation }) => ({
                header: () => <Header navigation={navigation} />,
            })}
        />
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
                header: () => <Header navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
);

// My List Stack Navigator
const MyListStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="My List"
            component={MyListScreen}
            options={({ navigation }) => ({
                header: () => <Header navigation={navigation} />,
            })}
        />
        <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ navigation }) => ({
                header: () => <Header navigation={navigation} />,
            })}
        />
        <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={({ navigation }) => ({
                header: () => <Header navigation={navigation} />,
            })}
        />
    </Stack.Navigator>
);

// Tab Navigator
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false, // Removes default Tab Navigator headers
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'MyList') {
                    iconName = focused ? 'list' : 'list-outline';
                }
                // Return the appropriate icon
                return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                backgroundColor: '#f8f8f8',
                borderTopWidth: 1,
                borderTopColor: '#ddd',
            },
        })}
    >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="MyList" component={MyListStackNavigator} />
    </Tab.Navigator>
);

// Main Navigation Container
const MainNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff', // Match the header background
        paddingTop: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    hamburger: {
        fontSize: 24,
        color: '#000',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    profileIcon: {
        fontSize: 24,
        color: '#000',
    },
});

export default MainNavigator;
