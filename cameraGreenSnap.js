import React, { Component } from 'react';
import {
  Camera,
//  Video,
  FileSystem,
  Permissions,
} from 'expo';
//import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
//  Slider,
//  Image,
//  Picker,
//  Button,
//  ScrollView,
  Vibration,
} from 'react-native';


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
    
    takePicture = async function() {
    if (this.camera) {
      this.camera.takePicture().then(data => {
        FileSystem.moveAsync({
          from: data,
          to: `${FileSystem.documentDirectory}photos/Photo_${this.state
            .photoId}.jpg`,
        }).then(() => {
          this.setState({
            photoId: this.state.photoId + 1,
          });
          Vibration.vibrate();
        });
      });
    }
  };
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
                  style={{ fontSize: 20, marginBotton: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                    styles.flipButton,
                    styles.picButton,
                    { flex: 0.3, alignSelf: 'flex-end' },
                    ]}
                    onPress={this.takePicture.bind(this)}>
                    <Text style={styles.flipText}> SNAP </Text>
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

const styles = StyleSheet.create({
/*  container: {
    flex: 1,
    backgroundColor: 'ivory',
  },*/
/*  navigation: {
    flex: 1,
  },*/
/*  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },*/
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
/*  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },*/
  picButton: {
    backgroundColor: 'darkseagreen',
  },
/*  galleryButton: {
    backgroundColor: 'indianred',
  },*/
/*  row: {
    flexDirection: 'row',
  },*/
});