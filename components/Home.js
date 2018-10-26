// Home.js
import React from 'react';
import { View, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            error: null,
        };
    }

    _handleSubmit() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latitude = position.coords.latitude.toString();
                let longitude = position.coords.longitude.toString();
            AsyncStorage.multiSet([
                ['date', new Date()],
                ['message', this.state.message],
                ['latitude', latitude],
                ['longitude', longitude]
            ]);
                this.setState({
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        if (this.state.message != '' && this.state.error == null) {
            alert("Message sauvegardé");
        } else {
            if (this.state.error != null) {
                alert("La position n'a pas pu être récupérée");
            } else if (this.state.message == '') {
                alert("Le message est vide");
            } else {
                alert("Oups");
            }
        }
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
            label='Message'
            multiline={true}
            numberOfLines={4}
            style={styles.textarea}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
        />

        <Button
          onPress={() => { this._handleSubmit() }}
          title="Submit"
          color="tomato"
          style={styles.submit}
          accessibilityLabel="Send your message with your location to a friend"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  submit: {
    flex: 1,
  },
});

export default HomeScreen;