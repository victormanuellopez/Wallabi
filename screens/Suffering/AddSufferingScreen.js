import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../../database/firebaseDB';

class AddSufferingScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('suffering');
    this.state = {
      padecimiento: '',
      sintomas: '',
      tratamiento: '',
      medicamento: '',
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

  storeSuffering() {
    if(this.state.padecimiento === ''){
     alert('Fill at least the suffering!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
      padecimiento: this.state.padecimiento,
      sintomas: this.state.sintomas,
      tratamiento: this.state.tratamiento,
      medicamento: this.state.medicamento,
      }).then((res) => {
        this.setState({
          padecimiento: '',
          sintomas: '',
          tratamiento: '',
          medicamento: '',
          isLoading: false
        });
        this.props.navigation.navigate('SufferingScreen')
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
              placeholder={'Padecimientos'}
              value={this.state.padecimiento}
              onChangeText={(val) => this.inputValueUpdate(val, 'padecimiento')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Sintomas'}
              value={this.state.sintomas}
              onChangeText={(val) => this.inputValueUpdate(val, 'sintomas')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Tratamiento'}
              value={this.state.tratamiento}
              onChangeText={(val) => this.inputValueUpdate(val, 'tratamiento')}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Medicamento'}
              value={this.state.medicamento}
              onChangeText={(val) => this.inputValueUpdate(val, 'medicamento')}
          />
        </View>
        
        <View  style={styles.botones}>
          <Button
            title=' Suffering List'
            onPress={() => this.storeSuffering()} 
             
          />
        </View>
        <View  style={styles.botones}>
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
export default AddSufferingScreen;