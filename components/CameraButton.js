import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

function CameraButton({ onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttons}>
      <Entypo name={icon} size={40} color={color ? color : 'grey'} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttons: {
    height: 70,
    width: 70,
    backgroundColor: 'black',
    borderRadius: 70 / 2,
    borderWidth: 3,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraButton;
