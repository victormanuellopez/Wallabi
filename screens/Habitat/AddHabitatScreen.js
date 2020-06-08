import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../../database/firebaseDB';


class AddHabitatScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('zoo');
    this.state = {
      nombre: '',
      tem: '',
      hum: '',
      tam: '',
      lant: '',
      long: '',
      tipo: '',
      isLoading: false
    };
  }
  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeHome(){
    this.props.navigation.navigate('HomeScreen')
  }
  storeHabitat() {
    if(this.state.nombre === ''){
     alert('Fill at least the name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombre: this.state.nombre,
        tem: this.state.tem,
        hum: this.state.hum,
        tam: this.state.tam,
        lant: this.state.lant,
        long: this.state.long,
        tipo: this.state.tipo
      }).then((res) => {
        this.setState({
          nombre: '',
          tem: '',
          hum: '',
          tam: '',
          lant: '',
          long: '',
          tipo: '',
          isLoading: false
        });
        this.props.navigation.navigate('HabitatScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
          <TextInput
              placeholder={'Nombre'}
              value={this.state.nombre}
              onChangeText={(val) => this.inputValueUpdate(val, 'nombre')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              keyboardType = {'number-pad'}
              placeholder={'Temperatura °C'}
              value={this.state.tem}
              onChangeText={(val) => this.inputValueUpdate(val, 'tem')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              keyboardType = {'numeric'}
              placeholder={'Humedad %'}
              value={this.state.hum}
              onChangeText={(val) => this.inputValueUpdate(val, 'hum')}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              keyboardType = {'number-pad'}
              placeholder={'Tamaño M2'}
              value={this.state.tam}
              onChangeText={(val) => this.inputValueUpdate(val, 'tam')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Latitud'}
              value={this.state.lant}
              onChangeText={(val) => this.inputValueUpdate(val, 'lant')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Longitud'}
              value={this.state.long}
              onChangeText={(val) => this.inputValueUpdate(val, 'long')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Tipo'}
              value={this.state.tipo}
              onChangeText={(val) => this.inputValueUpdate(val, 'tipo')}
          />
        </View>
        <View style={styles.botones}>
          <Button
            title='Add Habitat'
            onPress={() => this.storeHabitat()} 
             
          />
        </View>
        <View style={styles.botones}>
          <Button
            title='Back Home'
            onPress={() => this.storeHome()} 
             
          />
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  botones: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 0,
    marginBottom: 15,
  },
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
export default AddHabitatScreen;