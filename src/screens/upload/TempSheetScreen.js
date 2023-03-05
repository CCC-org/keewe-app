// Scroll to a Specific Item in ScrollView List View
// https://aboutreact.com/scroll_to_a_specific_item_in_scrollview_list_view/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const scrollHandler = () => {
    if (dataSourceCords.length > scrollToIndex) {
      ref?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[scrollToIndex - 1],
        animated: true,
      });
    } else {
      alert('Out of Max Index');
    }
  };

  const ItemView = (item, key) => {
    return (
      // Flat List Item
      <View
        key={key}
        style={styles.item}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}
      >
        <Text style={styles.itemStyle} onPress={() => getItem(item)}>
          {item.id}. {item.title}
        </Text>
        <ItemSeparatorView />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.itemSeparatorStyle} />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            value={String(scrollToIndex ? scrollToIndex : 0)}
            numericvalue
            keyboardType={'numeric'}
            onChangeText={(scrollToIndex) => {
              setScrollToIndex(parseInt(scrollToIndex != '' ? scrollToIndex : 0));
            }}
            placeholder={'Enter the index to scroll'}
            style={styles.searchInput}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={scrollHandler} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Go to Index</Text>
          </TouchableOpacity>
        </View>
        {/* List Item as a function */}
        <ScrollView
          ref={(ref) => {
            setRef(ref);
          }}
        >
          {dataSource.map(ItemView)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e73be',
    padding: 5,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  searchButton: {
    padding: 15,
    backgroundColor: '#f4801e',
  },
  searchButtonText: {
    color: '#fff',
  },
});

export default App;
