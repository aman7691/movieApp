import React from 'react';
import { Box, StatusBar } from '@gluestack-ui/themed';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView edges={['top']}>
      <StatusBar backgroundColor='#2c3e50' />
      <Box bg='#2c3e50' alignItems='center' justifyContent='center' py={10}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Movie App</Text>
      </Box>
    </SafeAreaView>
  );
}

export default Header;