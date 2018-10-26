// Historic.js
import React from 'react';
import { Text, View, StyleSheet, AsyncStorage, FlatList, Button } from 'react-native';
import Items from './Items';
//import moment from 'moment';

class HistoricScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            historic: [],
        };
    }

    _loadMessages() {
    AsyncStorage.multiGet(['date', 'message', "latitude", "longitude"]).then(response => {
        this.setState({
            historic: [
                ...this.state.historic, {
//                date: moment(response[0][1]).format('dddd, MMMM Do YYYY, H:mm'),
                date: response[0][1],
                message: response[1][1],
                latitude: response[2][1],
                longitude: response[3][1]
            }]
        });

        AsyncStorage.multiRemove(['date', 'message', "latitude", "longitude"]);
    });
    }

    _renderItems = ({ item }) => {
        return <Items content={item} />;
    }

  render() {
    return (
      <View style={styles.container}>
        <Text>Historic</Text>

        <FlatList
          data={this.state.historic}
          renderItem={this._renderItems} />

        <Button
          onPress={() => { this._loadMessages() }}
          title="Update"
          color="tomato"
          accessibilityLabel="Update historic"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default HistoricScreen;
