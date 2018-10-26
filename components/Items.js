// Items.js

import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

class Items extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { content } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{content.date}</Text>
        <Text style={styles.text}>{content.message}</Text>
        <Text style={styles.text}>Coordonnées GPS : {content.latitude}, {content.longitude}</Text>
      </View>
    );
  }
}

const { width: vw } = Dimensions.get('window');
const CARD_MARGIN = 15;

const styles = StyleSheet.create({
  container: {
    width: vw - (CARD_MARGIN * 2),
    margin: CARD_MARGIN,
    borderColor: '#ecf0f1',
    borderWidth: 1,
    borderRadius: CARD_MARGIN,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 21,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Items;