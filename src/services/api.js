import axios from 'axios';

const API_BASE = 'https://api.rapidmock.com/api/vikuman/v1';

// Fetch all movies
export const fetchMovies = () =>
    axios.get(`${API_BASE}/movies/all`);

// Fetch details of a specific movie by ID
export const fetchMovieDetails = (id) =>
    axios.get(`${API_BASE}/movies`, { params: { id } });

// Fetch user's My List (Watched and To Watch)
export const fetchMyList = async () => {
    const response = await axios.get(`${API_BASE}/mylist`);
    return response.data;
};

// Add a movie to "My List" with a specific status
export const addToMyList = (movieId, status) => {
    return axios.post(`${API_BASE}/mylist/add`, {
        movie_id: movieId,
        status, // 'Watched' or 'To Watch'
    });
}
