import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebaseDB';

class HabitatDetailScreen extends Component {
    constructor() {
    super();
    this.state = {
      nombre: '',
      tem: '',
      hum: '',
      tam: '',
      lant: '',
      long: '',
      tipo: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('zoo').doc(this.props.route.params.habitatkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const zoo = res.data();
        this.setState({
          key: res.id,
          nombre: zoo.nombre,
          tem: zoo.tem,
          hum: zoo.hum,
          tam: zoo.tam,
          lant: zoo.lant,
          long: zoo.long,
          tipo: zoo.tipo,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateHabitat() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('zoo').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
        tem: this.state.tem,
        hum: this.state.hum,
        tam: this.state.tam,
        lant: this.state.lant,
        long: this.state.long,
        tipo: this.state.tipo
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
          tem: '',
          hum: '',
          tam: '',
          lant: '',
          long: '',
          tipo: '',
        isLoading: false,
      });
      this.props.navigation.navigate('HabitatScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteHabitat() {
    const dbRef = firebase.firestore().collection('zoo').doc(this.props.route.params.habitatkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('HabitatScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Habitat',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteHabitat()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
        <View  style={styles.botones}>
          <Button
            title='Update'
            onPress={() => this.updateHabitat()} 
             
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
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
  },
  button: {
    marginBottom: 7, 
  }
})


export default HabitatDetailScreen;