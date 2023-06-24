import { React } from 'react'
import {
    Box,
    Text,
    Container
} from '@chakra-ui/react'
import { MdMovie } from 'react-icons/md'

function MovieCard(props) {
    return (
        <Container>
            <Box w="200px" h="350px" bg="#171923" borderRadius="xl" overflow="clip">
                <Box w="200px" h="300px">
                    <img src={props.poster} style={{width: "100%", height: "100%"}} />    
                </Box>
                <Text fontWeight="bold" ml="10px"><MdMovie size="1.4em" style={{paddingBottom: "4px", display: "inline", verticalAlign: "middle"}} /> {props.name}</Text>
                <Text fontWeight="semibold" ml="10px" fontSize="0.9em" color="#A0AEC0">{props.year}</Text>
            </Box>
        </Container>
    )
}

export default MovieCard