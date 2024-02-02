import { StatusBar } from 'expo-status-bar';
import { Button, GluestackUIProvider, ButtonText, Center } from '@gluestack-ui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { config } from '@gluestack-ui/config';
import Header from './src/component/Header';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/component/Tabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Tabs />
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  topNavi:{
    display:'flex',
    flexDirection:'row',
    alignItems:"center"
  },
  button1:{
    backgroundColor:"transparent",
  },
  buttonText:{
    color:''
  }

});
