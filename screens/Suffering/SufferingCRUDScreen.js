import React, { Component } from 'react'
import { Button, StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';

class SufferingCRUDScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  storeAddSuffering(){
    this.props.navigation.navigate('AddSufferingScreen')
  }
  storeSuffering(){
    this.props.navigation.navigate('SufferingScreen')
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
            title='Add Suffering'
            onPress={() => this.storeAddSuffering()} 
             />
        </View>

        <View  style={styles.botones}>
          <Button
            title='Suffering List'
            onPress={() => this.storeSuffering()} 
            />
        </View>
        
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  botones: {
    justifyContent: 'space-around',
    marginBottom: 20,
  }, 
  container: {
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

export default SufferingCRUDScreen;