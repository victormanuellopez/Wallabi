import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebaseDB';


class EmployeetScreen extends Component {
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('employee');
        this.state = {
          isLoading: true,
          employeeArr: []
        };
      }
    
      componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getCollection = (querySnapshot) => {
        const employeeArr = [];
        querySnapshot.forEach((res) => {
          const { nombreCom, rol,cedula, habitat } = res.data();
          employeeArr.push({
            key: res.id,
            res,
            nombreCom,
            rol,
            cedula,
            habitat,
          });
        });
        this.setState({
          employeeArr,
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
                this.state.employeeArr.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      chevron
                      bottomDivider
                      title={item.nombreCom}
                      subtitle={item.rol}
                      onPress={() => {
                        this.props.navigation.navigate('EmployeeDetailScreen', {
                          employeekey: item.key
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

export default EmployeetScreen;