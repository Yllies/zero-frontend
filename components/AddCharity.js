import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export default function DonationScreen() {
  return (
    <View style={styles.containerPage}>
      <TouchableOpacity style={styles.touch}>
        <Text style={styles.don}>Don de vêtements</Text>
        <Image
          style={styles.donationImage}
          source={require('../assets/don.png')}
          alt="don"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  

  },
  touch: {
    alignItems: 'center',
 
    
  },
  don: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:"Poppins",
  },
  donationImage: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
