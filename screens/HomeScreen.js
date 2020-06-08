import React, { Component } from 'react'
import { Button, StyleSheet, ScrollView, ActivityIndicator, View, Text } from 'react-native';


class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  storeHabitatCRUD(){
    this.props.navigation.navigate('HabitatCRUDScreen')
  }
  storeSufferingCRUD(){
    this.props.navigation.navigate('SufferingCRUDScreen')
  }
  storeEmployeeCRUD(){
    this.props.navigation.navigate('EmployeeCRUDScreen')
  }
  storeAnimalCRUD(){
    this.props.navigation.navigate('AnimalCRUDScreen')
  }
  storeUserCRUD(){
    this.props.navigation.navigate('UserCRUDScreen')
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
        
        <View style={styles.inputGroup}>
          <Text> ZOO WALLABI </Text>
        </View>

        <View style={styles.botones}>
          <Button
            title='Habitat'
            onPress={() => this.storeHabitatCRUD()} 
            />
        </View>
        
        <View style={styles.botones}>
          <Button
            title='Suffering'
            onPress={() => this.storeSufferingCRUD()} 
            />
        </View>

        <View style={styles.botones}>
          <Button
            title='Employee'
            onPress={() => this.storeEmployeeCRUD()} 
            />
        </View>

        <View style={styles.botones}>
          <Button
            title='Animal'
            onPress={() => this.storeAnimalCRUD()} 
            />
        </View>

        <View style={styles.botones}>
          <Button
            title='User'
            onPress={() => this.storeUserCRUD()} 
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
export default HomeScreen;