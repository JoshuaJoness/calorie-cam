import React, { useEffect }from 'react'
import {View,Text,Button} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const Test = () => {
  const takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      base64: true
    });
    // here we set the image to base64 data of the image that we took with the camera
    setImage(base64);
    setImageToDisplay(uri)
  };
  return(
    <View>
      <Text>Txt</Text>
      <Button title="click" onPress={takePicture}/>
    </View>
  )
}

export default Test
