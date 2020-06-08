import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebaseDB';

class HabitatDetailScreen extends Component {
    constructor() {
    super();
    this.state = {
      nombre: '',
      especie: '',
      edad: '',
      tiempo: '',
      lugar: '',
      habitat: '',
      padecimiento: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('animal').doc(this.props.route.params.animalkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const animal = res.data();
        this.setState({
          key: res.id,
          nombre: animal.nombre,
          especie: animal.especie,
          edad: animal.edad,
          tiempo: animal.tiempo,
          lugar: animal.lugar,
          habitat: animal.habitat,
          padecimiento: animal.padecimiento,
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

  updateAnimal() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('animal').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
        especie: this.state.especie,
        edad: this.state.edad,
        tiempo: this.state.tiempo,
        lugar: this.state.lugar,
        habitat: this.state.habitat,
        padecimiento: this.state.padecimiento
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        especie: '',
        edad: '',
        tiempo: '',
        lugar: '',
        habitat: '',
        padecimiento: '',
        isLoading: false,
      });
      this.props.navigation.navigate('AnimalScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteAnimal() {
    const dbRef = firebase.firestore().collection('animal').doc(this.props.route.params.animalkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('AnimalScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Animal',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteAnimal()},
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
              placeholder={'Especie'}
              value={this.state.especie}
              onChangeText={(val) => this.inputValueUpdate(val, 'especie')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              keyboardType = {'numeric'}
              placeholder={'Edad'}
              value={this.state.edad}
              onChangeText={(val) => this.inputValueUpdate(val, 'edad')}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Llegada'}
              value={this.state.tiempo}
              onChangeText={(val) => this.inputValueUpdate(val, 'tiempo')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Picker
            selectedValue={this.state.lugar}
            style={{ height: 50, width: 300, alignItems: 'stretch' }}
            onValueChange={(itemValue, itemIndex) => this.setState({lugar: itemValue})}>
            <Picker.Item label="Interno" value="Interno" />
            <Picker.Item label="Externo" value="Externo" />

          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Picker
            selectedValue={this.state.habitat}
            style={{ height: 50, width: 300, alignItems: 'stretch' }}
            onValueChange={(itemValue, itemIndex) => this.setState({habitat: itemValue})}>
            <Picker.Item label="Selva" value="Selva" />
            <Picker.Item label="Tundra" value="Tundra" />
            <Picker.Item label="Bosque" value="Bosque" />
            <Picker.Item label="Pradera" value="Pradera" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Picker
            selectedValue={this.state.padecimiento}
            style={{ height: 50, width: 300, alignItems: 'stretch' }}
            onValueChange={(itemValue, itemIndex) => this.setState({padecimiento: itemValue})}>
            <Picker.Item label="Ninguna" value="Ninguna" />
            <Picker.Item label="Quenadura" value="Quenadura" />
            <Picker.Item label="Herida" value="Herida" />
            <Picker.Item label="Parasitos" value="Parasitos" />
            <Picker.Item label="Fractura" value="Fractura" />
          </Picker>
        </View>


        <View  style={styles.botones}>
          <Button
            title='Add Animal'
            onPress={() => this.storeAnimal()} 
             
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