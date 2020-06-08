import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Picker } from 'react-native';
import firebase from '../../database/firebaseDB';

class EmployeeDetailScreen extends Component {
    constructor() {
    super();
    this.state = {
      nombreCom: '',
      rol: '',
      cedula: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('employee').doc(this.props.route.params.employeekey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const employee = res.data();
        this.setState({
          key: res.id,
          nombreCom: employee.nombreCom,
          rol: employee.rol,
          cedula: employee.cedula,
          habitat: employee.habitat,
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

  updateEmployee() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('employee').doc(this.state.key);
    updateDBRef.set({
      nombreCom: this.state.nombreCom,
      rol: this.state.rol,
      cedula: this.state.cedula,
    }).then((docRef) => {
      this.setState({
        key: '',
        nombreCom: '',
        rol: '',
        cedula: '',
        habitat: '',
        isLoading: false,
      });
      this.props.navigation.navigate('EmployeeScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteEmployee() {
    const dbRef = firebase.firestore().collection('employee').doc(this.props.route.params.employeekey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('EmployeeScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Employee',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteEmployee()},
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
          <TextInput
              placeholder={'habitat'}
              value={this.state.habitat}
              onChangeText={(val) => this.inputValueUpdate(val, 'habitat')}
          />
        </View>

        <View  style={styles.botones}>
          <Button
            title='Update'
            onPress={() => this.updateEmployee()} 
             
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


export default EmployeeDetailScreen;