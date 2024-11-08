// src/components/HomePage.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieTable from './MovieTable';
import { Button, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dummy data for trending movies
const fetchTrendingMovies = async () => {
    return [
        { id: 1, title: 'Movie 1', releaseDate: '2023-01-01', rating: 8.5 },
        { id: 2, title: 'Movie 2', releaseDate: '2023-02-01', rating: 7.5 },
        { id: 3, title: 'Movie 3', releaseDate: '2023-03-01', rating: 9.0 },
        { id: 4, title: 'Movie 4', releaseDate: '2023-04-01', rating: 6.0 },
        { id: 5, title: 'Movie 5', releaseDate: '2023-05-01', rating: 8.0 },
    ];
};

const HomePage = () => {
    const navigate = useNavigate();
    const { data: movies = [], isLoading } = useQuery({
        queryKey: ['trendingMovies'],
        queryFn: fetchTrendingMovies,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Trending Movies
            </Typography>

            {/* Align the Search Button */}
            <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 3 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '12px 24px', fontSize: '16px', boxShadow: 3, width: '100%' }}
                        onClick={() => navigate('/search')}
                    >
                        Search Movies
                    </Button>
                </Grid>
            </Grid>

            {/* Movie Table */}
            <MovieTable movies={movies} />
        </Box>
    );
};

export default HomePage;
