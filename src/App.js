import React from 'react';
import MainNavigator from './navigation/MainNavigator';
import { AppProvider } from './contexts/AppContext';

export default function App() {
    return (
        <AppProvider>
            <MainNavigator />
        </AppProvider>
    );
}
