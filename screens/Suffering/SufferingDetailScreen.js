import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebaseDB';

class SufferingDetailScreen extends Component {
    constructor() {
    super();
    this.state = {
      padecimiento: '',
      sintomas: '',
      tratamiento: '',
      medicamento: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('suffering').doc(this.props.route.params.sufferingkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const suffering = res.data();
        this.setState({
          key: res.id,
          padecimiento: suffering.padecimiento,
          sintomas: suffering.sintomas,
          tratamiento: suffering.tratamiento,
          medicamento: suffering.medicamento,
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

  updateSuffering() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('suffering').doc(this.state.key);
    updateDBRef.set({
      padecimiento: this.state.padecimiento,
      sintomas: this.state.sintomas,
      tratamiento: this.state.tratamiento,
      medicamento: this.state.medicamento,
    }).then((docRef) => {
      this.setState({
        key: '',
        padecimiento: '',
        sintomas: '',
        tratamiento: '',
        medicamento: '',
        isLoading: false,
      });
      this.props.navigation.navigate('SufferingScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteSuffering() {
    const dbRef = firebase.firestore().collection('suffering').doc(this.props.route.params.sufferingkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('SufferingScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Suffering',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteSuffering()},
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
            title='Update'
            onPress={() => this.updateSuffering()} 
             
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
  container: {
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


export default SufferingDetailScreen;