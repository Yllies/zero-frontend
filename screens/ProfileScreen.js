import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';

const UserProfile = () => {
  const dispatch= useDispatch();
  const user = useSelector((state) => state.user.value);

  const handelLogout = () => {
    dispatch(logout());
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
        source={require('../assets/me.jpg')}
        style={styles.image}
        resizeMode="cover"
       />
       

      </View>
      {/* <Image
        source={require('../assets/me.jpg')}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome
            name="fa-star"
            size={20}
            color="#274539" 
            style={styles.filterIcon}
          />
          {/* <FontAwesomeIcon icon="fa-duotone fa-circle-star" 
          style={{"--fa-primary-color": "#274539", "--fa-secondary-color": "#edfc92", "--fa-secondary-opacity": "1",}} /> 
        </TouchableOpacity>
      </View>

      <View style={styles.botcontiner}>
        <Text style={styles.title}>Qui sommes-nous?</Text>
      </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image:{
    borderRadius: 0 0 30 0
  },
  iconContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  icon: {
    marginBottom: 10,
    // Ajoutez ici les styles de vos icônes
  },
  buttonContainer: {
    marginTop: 250,
    // Ajustez la marge supérieure en fonction de la disposition souhaitée
  },
  title: {
    color: 'black',
  },
  button: {
    backgroundColor: '#EDFC92',
    padding: 10,
    width: 290,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins',
  },
  botcontiner: {
    justifyContent: 'flex-start', // Updated from 'center' to 'flex-start'
    alignItems: 'flex-start',     // Updated from 'center' to 'flex-start'
    marginTop: 250,              // You can adjust the marginTop as needed
  },
});

export default UserProfile;

