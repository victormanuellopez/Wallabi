import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../../database/firebaseDB';


class SufferingScreen extends Component {
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection('suffering');
        this.state = {
          isLoading: true,
          sufferingArr: []
        };
      }
    
      componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
      }
    
      componentWillUnmount(){
        this.unsubscribe();
      }
    
      getCollection = (querySnapshot) => {
        const sufferingArr = [];
        querySnapshot.forEach((res) => {
          const { padecimiento, sintomas, tratamiento, medicamento, } = res.data();
          sufferingArr.push({
            key: res.id,
            res,
            padecimiento,
            sintomas,
            tratamiento,
            medicamento,
          });
        });
        this.setState({
          sufferingArr,
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
                this.state.sufferingArr.map((item, i) => {
                  return (
                    <ListItem
                      key={i}
                      chevron
                      bottomDivider
                      title={item.padecimiento}
                      subtitle={item.sintomas}
                      onPress={() => {
                        this.props.navigation.navigate('SufferingDetailScreen', {
                          sufferingkey: item.key
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

export default SufferingScreen;