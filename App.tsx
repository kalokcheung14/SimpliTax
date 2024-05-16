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
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

type Item = {
  price: number,
}

/**
* Calculate the price after tax
**/
function calcTax(pretax: number): number {
  if (isNaN(pretax)) {
    return 0
  } else {
    return pretax * 1.13
  }
}

/**
* Calculate the total price of all items added
**/
function calcTotal(itemList: Item[]): number {
  let total: number = 0;

  itemList.map((item) => {
    total = +total + +item.price
  });

  return total;
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [pretax, onPretaxPriceChanged] = React.useState(0);
  const [itemList, setItemList] = React.useState([{price: 0}]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.titleText}>SimpliTax</Text>
      <Text style={styles.mainText}>Enter the price before tax:</Text>
      <TextInput
         value={pretax}
         style={styles.input}
         onChangeText={onPretaxPriceChanged}
         keyboardType="numeric"
       />
      <Text style={styles.mainText}>The price after tax:</Text>
      <Text style={styles.mainText}>{calcTax(pretax).toFixed(2)}</Text>
      <View style={styles.buttons}>
        <Button
          title="Add To Total"
          onPress={ () => {
            if (pretax > 0) {
              setItemList([...itemList, {price: calcTax(pretax)}])
            }
          }
        }
        />
        <Button
          title="Add As Tax-Free Item"
          color="#009955"
          onPress={ () => {
            if (pretax > 0) {
              // Append item to total as tax-free item
              setItemList([...itemList, {price: pretax}])
            }
          }
        }
        />
      </View>
      <Text style={styles.mainText}>Current Total:</Text>
      <Text style={styles.mainText}>{calcTotal(itemList).toFixed(2)}</Text>
      <View
        style={styles.clearTotal}>
        <Button
            color="#dd3355"
            title = "Clear Total"
            onPress={ () => {
              // Show confirmation dialog before clearing total items
              Alert.alert(
                'Clear Total',
                'Are you sure?',
                [
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      // Clear total items
                      setItemList([])
                    },
                  },
                ],
                {
                  cancelable: true,
                },
              );
            }
          }
          />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '800',
  },
  mainText: {
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
  buttons: {
    marginTop: 10,
    marginBottom: 10,
    gap: 10,
  },
  clearTotal: {
    marginTop: 10,
  }
});

export default App;
