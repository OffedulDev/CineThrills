import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { 
    ChakraProvider, 
    ColorModeScript,
    Box,
    Flex,
    Input,
    HStack,
    VStack,
    InputLeftAddon,
    InputGroup,
    Switch, 
    Container,
    Text,
    Button } from '@chakra-ui/react';

import { extendTheme, useToast } from '@chakra-ui/react';
import MovieCard from './components/movie-card'
import MovieList from './components/movie-list'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
const api_key = "ef502f59"

function App() {
  const toast = useToast()

  const searchBar = useRef();
  const [resultMovies, setResultMovies ] = useState([])

  async function handleSearch(e) {
    const filteredSearch = searchBar.current.value.replace(/%20/g, '+');
    const originalSearch = searchBar.current.value

    toast({
      title: 'Searching for "' + originalSearch + '"',
      status: "info",
      isClosable: true
    })
    searchBar.current.value = ""
    const apiReponse = await fetch("http://www.omdbapi.com?apiKey=" + api_key + "&s=" + filteredSearch)

    const jsonResponse = await apiReponse.json()
    const movieResults = jsonResponse.Search || []

    if (movieResults.length < 1) {
      toast({
        title: "No movie found!",
        status: "error",
        isClosable: true
      })

      return
    }

    toast({
      title: 'Search has given ' + movieResults.length + ' results.',
      status: "success",
      isClosable: true
    })

    setResultMovies(movieResults)
  }

  return (
    <VStack>
      <Container w="100vw" h="30vh">
        <Flex w="100%" h="100%" justifyContent="flex-end" alignItems="center" flexDirection="column">
          <Text textAlign="center" fontSize="6xl" fontWeight="extrabold" color="#F6E05E">CineThrills</Text>
          <Text textAlign="center" pt="1" fontSize={{sm: "xl", md: "2xl", lg: "2xl"}} fontWeight="medium" color="#A0AEC0">Thrill Your Movie Nights with CineThrills!</Text>
        </Flex>
      </Container>
      <Container w="100vw" h="15vh">
          <Flex justifyContent="center" alignItems="center" flexDirection="column">
            <Input ref={searchBar} mt="20px" size={{ base: "lg", md: "md", lg: "md" }} variant="filled" placeholder="Search any title, series, or actor." />
            <Button mt="20px" size="md" onClick={handleSearch} colorScheme='yellow'>Search</Button>
          </Flex>
      </Container>
      <Container>
        <MovieList movies={resultMovies} />
      </Container>
    </VStack>
  );
}

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);