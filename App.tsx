/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';


function calcTax(pretax: string) {
  return (pretax * 1.13).toFixed(3);
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [pretax, onPretaxPriceChanged] = React.useState('0');
  const [aftertax, ] = React.useState('0');

  return (
    <SafeAreaView style={[
      styles.sectionContainer,
      {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        jutifyContents: 'space-around',
      }
    ]}>
      <Text style={styles.sectionTitle}>Enter the price before tax:</Text>
      <TextInput
         value={pretax}
         style={styles.input}
         onChangeText={onPretaxPriceChanged}
         keyboardType="numeric"
       />
      <Text style={styles.sectionTitle}>The price after tax:</Text>
      <Text style={styles.sectionTitle}>{calcTax(pretax)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 80,
    margin: 10,
    fontSize: 25,
    borderWidth: 2,
    padding: 10,
    textAlign: 'center',
    width: '80%',
  },
});

export default App;
