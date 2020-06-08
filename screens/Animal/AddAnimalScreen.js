import React, { Component } from 'react';
import { TouchableOpacity, Button, StyleSheet, TextInput, ScrollView,Picker, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../../database/firebaseDB';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class AddAnimalScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('animal');
    this.state = {
      nombre: '',
      especie: '',
      edad: '',
      tiempo: '',
      lugar: '',
      habitat: '',
      padecimiento: '',
      isLoading: false,
      insVisible: false
    };
  }

  handlePicker = (datetime)=>{
    this.setState({
      isVisible: false,
      choserDate: moment(datetime).format('MMMM,a YYYY HH:mm')
    })
  }
  showPicker = () => {
    this.setState({
      isVisible: true
    })
  }
  hidePicker = () => {
    this.setState({
      isVisible: false
    })
  }
  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  storeAnimal() {
    if(this.state.nombre === ''){
     alert('Fill at least the name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombre: this.state.nombre,
        especie: this.state.especie,
        edad: this.state.edad,
        tiempo: this.state.tiempo,
        lugar: this.state.lugar,
        habitat: this.state.habitat,
        padecimiento: this.state.padecimiento
      }).then((res) => {
        this.setState({
          nombre: '',
          especie: '',
          edad: '',
          tiempo: '',
          lugar: '',
          habitat: '',
          padecimiento: '',
          isLoading: false
        });
        this.props.navigation.navigate('AnimalScreen')
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
          
          <Button title=" Date Picker" onPress={this.showPicker} style={styles.botones}/>
          <DateTimePickerModal
            isVisible={this.state.insVisible}
            mode={"datetime"}
            is24Hour={false}
            onConfirm={this.handlePicker}
            onCancel={this.hidePicker}
            value={this.state.tiempo}
            onDateChange={(val) => this.inputValueUpdate(val, 'tiempo')}
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
export default AddAnimalScreen;