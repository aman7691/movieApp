import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Input, InputSlot, InputIcon, SearchIcon, InputField } from '@gluestack-ui/themed';
import { Select, SelectTrigger, SelectInput, SelectIcon, Icon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem, } from '@gluestack-ui/themed';
import { ChevronDownIcon } from "@gluestack-ui/themed";
// import { SearchIcon } from "@gluestack-ui/themed";
import { Button, ButtonText, ButtonIcon, ButtonGroup } from "@gluestack-ui/themed"
import axios from 'axios';
import Cards from '../component/Cards';
import CustomSelect from '../component/CustomSelect';


const SearchResult = ({ navigation }) => {
  const [category, setCategory] = useState('multi');
  const [searchItem, setSearchItem] = useState([]);
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchMovies();
  }, []);



  const fetchMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTBjYTM1NDY0MGVjMGExYzZjZGVmZTkyMzkxYWI5NyIsInN1YiI6IjY1NWQ5ZmYyNjI5YjJjMDEwMWNhODUwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ddPmSxChNcwoklAmOyrcTG1MAGRGqdDP67hReRwT_hw'
      }
    };

    axios.get(`https://api.themoviedb.org/3/search/${category}?query=${input}`, options)
      .then(response => {
        if (response.data && response.data.results) {
          console.log(response.data.results)
          response.data.results.forEach((item) => {
            // console.log(item.media_type)
          })
          setSearchItem(response.data.results);
        } else {
          console.error('Invalid API response format');
        }
      })
      .catch(err => {
        console.error('Error fetching TV shows:', err);
      });
  };

  const handleValueChange = (value) => {
    setCategory(value);
  };

  const handleInputChange = (value) => {
    setInput(value)
  }

  const buttonPress = () => {
    fetchMovies()
  }

  const movieOptions = [
    { label: 'Multi', value: 'multi' },
    { label: 'Movies', value: 'movie' },
    { label: 'Tv', value: 'tv' },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headText}>Search Movie/ Tv Show Name *</Text>
        <Input style={styles.input}>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." onChangeText={handleInputChange} />
        </Input>
        <Text style={styles.headText}>Choose Search Type</Text>
        <View style={styles.selectContainer}>


          <CustomSelect 
            category={category}
            handleCategoryChange={handleValueChange}
            options={movieOptions} 
            style={{ width: 150 }}
          />

          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            style={styles.addButton}
            onPress={() => buttonPress()}

          >
            <ButtonIcon as={SearchIcon} m="$3" />
            <ButtonText>Search</ButtonText>

          </Button>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {searchItem.map(item => (
          <Cards key={item.id} movie={item} navigation={navigation} type={category == "multi" ? item.media_type : category} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
 
  input: {
    width: "80%"
  },
  select: {
    width: 150
  },
  selectContainer: {
    display: "flex",
    flexDirection: 'row',
    gap: 10
  },
  scrollView: {
    width: '100%',
  },
  addButton: {
    backgroundColor: "#06ADCE"
  },
});

export default SearchResult;
