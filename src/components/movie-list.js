import React from 'react';
import MovieCard from './movie-card';
import { HStack } from '@chakra-ui/react';

export default function MovieList(props) {
  return (
    <HStack spacing="15px" mt="30px" overflowY="clip" overflowX="scroll">
      {props.movies.map((movie, index) => (
        <MovieCard
          key={index}
          name={movie.Title}
          year={movie.Year}
          poster={movie.Poster}
        />
      ))}
    </HStack>
  );
}
