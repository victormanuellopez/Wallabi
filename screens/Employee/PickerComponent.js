import React, { Component } from 'react'
import {  ScrollView,  View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import firebase from '../../database/firebaseDB';

class PickerComponent extends Component {
    constructor(){
        super();
        this.firestoreRef = firebase.firestore().collection('zoo');
        this.state = {
          isLoading: true,
          zooArr: []
        };
    }


    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getCollection = (querySnapshot) => {
        const zooArr = [];
        querySnapshot.forEach((res) => {
            const { nombre, tem, hum, tam, lant,  long, tipo, } = res.data();
            zooArr.push({
              key: res.id,
              res,
              nombre,
              tem,
              hum,
              tam,
              lant,
              long,
              tipo,
            });
        });
        this.setState({
          zooArr, 
          isLoading: false,
       });
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
        {
                this.state.zooArr.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      chevron
                      bottomDivider
                      title={item.nombre}
                      subtitle={item.tipo}
                      onPress={() => {
                        this.props.navigation.navigate('AddEmployeeScreen', {
                          zookey: item.key
                        });
                      }}/>
                  );
                })
              }
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
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
export default PickerComponent