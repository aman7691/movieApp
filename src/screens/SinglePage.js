import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const SinglePage = ({ route }) => {
  const { movie_id, tv_show} = route.params;
  const [mediaDetails, setMediaDetails] = useState(null);

  useEffect(() => {
    fetchMediaDetails();
  }, []);

  const fetchMediaDetails = () => {
    let mediaType = 'movie';
    console.log(tv_show)
    if (tv_show == 'tv') {
      mediaType = 'tv';
    }
    console.log(mediaType, movie_id)
    axios.get(`https://api.themoviedb.org/3/${mediaType}/${movie_id}?language=en-US`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTBjYTM1NDY0MGVjMGExYzZjZGVmZTkyMzkxYWI5NyIsInN1YiI6IjY1NWQ5ZmYyNjI5YjJjMDEwMWNhODUwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ddPmSxChNcwoklAmOyrcTG1MAGRGqdDP67hReRwT_hw'
      }
    })
      .then(response => {
        console.log(response.data)
        setMediaDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching media details:', error);
      });
};

  if (!mediaDetails) {
    return (
      <View style={styles.container}>
        <Text>LOADING PLEASE WAIT</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mediaTitle}>{mediaDetails.title || mediaDetails.name}</Text>
      <Image
        style={styles.mediaImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${mediaDetails.poster_path}` }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.mediaDetails}>Overview: {mediaDetails.overview}</Text>
        <Text style={styles.mediaDate}>Popularity: {mediaDetails.popularity} | Release Date: {mediaDetails.release_date || mediaDetails.first_air_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  mediaImage: {
    marginTop: 30,
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  textContainer: {
    // alignItems: 'center',
  },
  mediaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mediaDetails: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 20,
    padding:5,
    textAlign:"left",
    
  },
  mediaDate:{
    paddingTop:10,
    fontWeight:"bold"
  }
});

export default SinglePage;
