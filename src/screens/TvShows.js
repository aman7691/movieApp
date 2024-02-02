import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView , Text} from 'react-native';
import { Select, SelectTrigger, SelectInput, SelectIcon, Icon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, flush } from '@gluestack-ui/themed';
import { ChevronDownIcon } from "@gluestack-ui/themed";
import axios from 'axios';
import { Button, ButtonText, ButtonIcon, ButtonGroup } from "@gluestack-ui/themed"
import MovieCard from '../component/Cards';
import CustomSelect from '../component/CustomSelect';
import { ActivityIndicator } from 'react-native';

const TvShows = ({ navigation }) => {

  const [tvShows, setTvShows] = useState([]);
  const [category, setCategory] = useState('popular')
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = () => {
    setLoading(true)
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTBjYTM1NDY0MGVjMGExYzZjZGVmZTkyMzkxYWI5NyIsInN1YiI6IjY1NWQ5ZmYyNjI5YjJjMDEwMWNhODUwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ddPmSxChNcwoklAmOyrcTG1MAGRGqdDP67hReRwT_hw'
      }
    };

    axios.get(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`, options)
      .then(response => {
        if (response.data && response.data.results) {
          setTvShows(response.data.results);
          setLoading(false);
        } else {
          console.error('Invalid API response format');
        }
      })
      .catch(err => {
        console.error('Error fetching TV shows:', err);
        setLoading(false);
      });
  };

  const handleCategoryChange = (value) => {
    setCategory(value)
  }

  const movieOptions = [
    { label: 'Popular', value: 'popular' },
    { label: 'Airing_Today', value: 'airing_today' },
    { label: 'On_The_Air', value: 'on_the_air' },
    { label: 'top_rated', value: 'top_rated' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <CustomSelect category={category}
          handleCategoryChange={handleCategoryChange}
          options={movieOptions} />
      </View>


      {loading ? (<View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading...</Text>
      </View>) : (<ScrollView style={styles.scrollView}>
        {tvShows.map(movie => (
          <MovieCard key={movie.id} movie={movie} navigation={navigation} type={"tv"} />
        ))}
      </ScrollView>)}


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'column',
    gap: 50

  },
  container1: {
    flex: 1,
    alignItems: 'center',
  },

  scrollView: {
    width: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default TvShows;
