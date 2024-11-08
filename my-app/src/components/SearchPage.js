// src/components/SearchPage.js
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TextField, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import debounce from 'lodash.debounce';

// Dummy API function to simulate fetching movie data with images
const fetchMovies = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: 'Avatar',
                    releaseDate: '2009-12-18',
                    rating: 7.8,
                    imageUrl: 'https://image.tmdb.org/t/p/w500/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg',
                },
                {
                    id: 2,
                    title: 'The Dark Knight',
                    releaseDate: '2008-07-18',
                    rating: 9.0,
                    imageUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
                },
                {
                    id: 3,
                    title: 'Interstellar',
                    releaseDate: '2014-11-07',
                    rating: 8.6,
                    imageUrl: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
                },
                {
                    id: 4,
                    title: 'Tenet',
                    releaseDate: '2020-08-26',
                    rating: 7.4,
                    imageUrl: 'https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg',
                },
                {
                    id: 5,
                    title: 'Dunkirk',
                    releaseDate: '2017-07-21',
                    rating: 7.9,
                    imageUrl: 'https://image.tmdb.org/t/p/w500/ebSnODDg9lbsMIaWg2uAbjn7TO5.jpg',
                },
            ]);
        }, 500); // Simulate network delay
    });
};

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch movies using React Query v5 with object syntax
    const { data: movies = [], isLoading, isError } = useQuery({
        queryKey: ['movies'],
        queryFn: fetchMovies,
    });

    // Debounce the search input to limit re-renders
    const debouncedSetSearchTerm = debounce((term) => {
        setSearchTerm(term);
    }, 300);

    // Filter movies based on the search term
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle change in search input
    const handleSearchChange = (e) => {
        debouncedSetSearchTerm(e.target.value);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading movies data</div>;

    return (
        <Box sx={{ padding: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>Search Movies</Typography>
            <TextField
                variant="outlined"
                placeholder="Search for movies..."
                onChange={handleSearchChange}
                fullWidth
                margin="normal"
            />
            <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
                {filteredMovies.map(movie => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Card sx={{ maxWidth: 250, margin: 'auto', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={movie.imageUrl}
                                alt={movie.title}
                            />
                            <CardContent sx={{ textAlign: 'center', padding: 2 }}>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Release Date: {movie.releaseDate}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Rating: {movie.rating}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchPage;
