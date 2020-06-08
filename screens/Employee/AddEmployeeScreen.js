import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Picker, Text } from 'react-native';
import firebase from '../../database/firebaseDB';

class AddEmployeeScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('employee');
    this.state = {
      nombreCom: '',
      rol: '',
      cedula: '',
      habitat: '',
      isLoading: false, 
    };
  }
  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  
  storeEmployee() {
    if(this.state.nombreCom === ''){
     alert('Fill at least the name!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombreCom: this.state.nombreCom,
        rol: this.state.rol,
        cedula: this.state.cedula,
        habitat: this.state.habitat,
      }).then((res) => {
        this.setState({
          nombreCom: '',
          rol: '',
          cedula: '',
          habitat: '',
          isLoading: false
        });
        this.props.navigation.navigate('EmployeeScreen')
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
              placeholder={'Nombre Completo'}
              value={this.state.nombreCom}
              onChangeText={(val) => this.inputValueUpdate(val, 'nombreCom')}
          />
        </View>
         
        <View style={styles.inputGroup}>
          <Picker
            selectedValue={this.state.rol}
            style={{ height: 50, width: 300, alignItems: 'stretch' }}
            onValueChange={(itemValue, itemIndex) => this.setState({rol: itemValue})}>
            <Picker.Item label="Medico" value="Medico" />
            <Picker.Item label="Operativo" value="Operativo" />
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
              keyboardType = {'number-pad'}
              placeholder={'Cedula'}
              value={this.state.cedula}
              onChangeText={(val) => this.inputValueUpdate(val, 'cedula')}
          />
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

                 
        <View  style={styles.botones}>
          <Button
            title='Add Employee'
            onPress={() => this.storeEmployee()} 
             
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
export default AddEmployeeScreen;