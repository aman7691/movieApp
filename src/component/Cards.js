import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, ButtonText } from "@gluestack-ui/themed";

const Cards = ({ movie, navigation, type }) => {
    return (
        <View style={styles.movieContainer}>
            <Image
                style={styles.movieImage}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
            />
            <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{movie.name || movie.title}</Text>
                <Text style={styles.movieDetails}>Popularity: {movie.popularity}</Text>
                <Text style={styles.movieDetails}>Release Date: {movie.first_air_date || movie.release_date}</Text>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    style={styles.addButton}
                    onPress={() => navigation.navigate('SinglePage', { movie_id: movie.id, tv_show: type})}
                >
                    <ButtonText>More Details</ButtonText>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    movieContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        flex: 1,
        padding: 10
    },
    movieImage: {
        width: 200,
        aspectRatio: 3 / 4,
        flex: 1,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    movieDetails: {
        fontSize: 16,
        marginTop: 5,
    },
    textContainer: {
        flex: 2,
        marginLeft: 10,
        padding: 10
    },
    addButton: {
        backgroundColor: "#06ADCE"
    }
});

export default Cards;
