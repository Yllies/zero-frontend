import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as React from 'react';


export default function Header() {

  
  return (
    <View style={styles.containerPage}>

<View style={styles.containerHeader} >   

<View style={styles.containerNotif}>

<MaterialIcons style={styles.icone} name="notifications" size={34} color="#FFFFFF" />
</View>

      <Text style={styles.text}>Bonjour <Text style={styles.textDynamique}>Name</Text></Text>

      <Text style={styles.paragraphe}>Bienvenue sur l’app Zéro</Text>
</View>
    </View>
  );
}


const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },

  containerHeader: {
    backgroundColor: "#274539",
    width: 400,
    height: 260,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop:50,
    paddingRight: 30,
    paddingLeft: 30,

  },

  text: {
    fontFamily: 'PoppinsBold',
    color: "white",
    fontSize: 40,
    fontWeight : 'bold',
    paddingBottom : 10,
  },
  
  paragraphe: {
    color: "white",
    fontSize: 17,
  },

  containerNotif: {
    padding : 5,
    flexDirection: 'row',
    justifyContent: "flex-end",
    paddingBottom : 20,
  },

  containerText : {
    flexDirection: 'row',
    justifyContent: "flex-start",


  },

  textDynamique : {
    color: "#EDFC92",

  }

});
