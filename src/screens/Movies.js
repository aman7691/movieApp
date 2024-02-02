import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Select, SelectTrigger, SelectInput, SelectIcon, Icon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem } from '@gluestack-ui/themed';
import { ChevronDownIcon } from "@gluestack-ui/themed";
import { Button, ButtonText, ButtonIcon, ButtonGroup } from "@gluestack-ui/themed"
import Cards from '../component/Cards';
import CustomSelect from '../component/CustomSelect';




const Movies = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('now_playing')

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = () => {
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
      })
      .catch(err => console.error(err));
  };

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

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


      <ScrollView style={styles.scrollView}>
        {movies.map(movie => (
          <Cards key={movie.id} movie={movie} navigation={navigation} type={"movie"} />
        ))}
      </ScrollView>

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



});

export default Movies;
