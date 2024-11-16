import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [myList, setMyList] = useState({
        watched: [
            { id: 1, title: 'Movie A', type: 'movie' },
            { id: 2, title: 'Show B', type: 'show' },
        ],
        toWatch: [
            { id: 3, title: 'Movie C', type: 'movie' },
            { id: 4, title: 'Show D', type: 'show' },
        ],
    });

    const addToList = (movie, status) => {
        setMyList((prev) => ({
            ...prev,
            [status === 'Watched' ? 'watched' : 'toWatch']: [
                ...prev[status === 'Watched' ? 'watched' : 'toWatch'],
                movie,
            ],
        }));
    };

    return (
        <AppContext.Provider value={{ myList, setMyList, addToList }}>
            {children}
        </AppContext.Provider>
    );
};
