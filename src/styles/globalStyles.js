import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.background,
    },
    text: {
        fontSize: 16,
        color: COLORS.text,
    },
    button: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
    },
});
