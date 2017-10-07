import React, { Component } from 'react';
//import {Button,Image, Text, View, StyleSheet} from 'react-native';// ERROR. The Expo team has been notified.
//import Expo, { Constants } from 'expo';
//import React from 'react';
//import TouchableOpacity from 'react-native';
/*import { Camera, Permissions } from 'expo';
import {View, TouchableOpacity} from 'react-native';*/

//import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';


export default class App extends Component {
    state = { 
        //imgUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOW5_BScHV-rzhG2PFO_ABv96VrkTg6bDF76Ej3xvbTftRURMIhQ',
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };
    
    async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }
    /*render() {
        return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>
            Welcome to Dance App 
            </Text>
            <Image source ={{ uri: this.state.imgUri,}} style= {{height: 200, width: 200, }} />
        <Button title = "Take a video" onPress = {this._takePhotoAsync}/>
      
        </View>
        );
    }
  
    _takePhotoAsync = async() => {
        let image = await Expo.ImagePicker.launchCameraAsync();
        if(!image.cancelled)
        {
            this.setState({ingUri:image.uri});
        }
      
    }*/
    
    render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

/*const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    color: '#34495e',
    },
});*/