import React, { Component } from 'react'
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Picker } from 'react-native';

class AnimalCRUDScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  storeAddAnimal(){
    this.props.navigation.navigate('AddAnimalScreen')
  }
  storeAnimal(){
    this.props.navigation.navigate('AnimalScreen')
  }
   
  
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <View  style={styles.botones}>
          <Button
            title='Add Animal'
            onPress={() => this.storeAddAnimal()} 
             />
        </View>

        <View  style={styles.botones}>
          <Button
            title='Animal List'
            onPress={() => this.storeAnimal()} 
            color="#19AC52"/>
        </View>
        
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  botones: {
    justifyContent: 'space-around',
    marginBottom: 20,
  }, container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AnimalCRUDScreen;