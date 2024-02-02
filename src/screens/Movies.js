import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import axios from 'axios';
import Cards from '../component/Cards';
import CustomSelect from '../component/CustomSelect';
import {ActivityIndicator} from 'react-native';


const Movies = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('now_playing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = () => {
    setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTBjYTM1NDY0MGVjMGExYzZjZGVmZTkyMzkxYWI5NyIsInN1YiI6IjY1NWQ5ZmYyNjI5YjJjMDEwMWNhODUwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ddPmSxChNcwoklAmOyrcTG1MAGRGqdDP67hReRwT_hw'
      }
    };

    axios.get(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const movieOptions = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Now Playing', value: 'now_playing' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <CustomSelect
          category={category}
          handleCategoryChange={handleCategoryChange}
          options={movieOptions}
        />
      </View>
  
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {movies.map(movie => (
            <Cards key={movie.id} movie={movie} navigation={navigation} type={"movie"} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 50,
    paddingTop: 30,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    height: "100%"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Movies;
