// Importation des composants et bibliothèques nécessaires
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import Modal from 'react-native-modal';
import FilterScreen from "../screens/FilterScreen";
import HomeScreen from "../screens/HomeScreen";


// Définition du composant Header
export default function Header({navigation}) {


  const user = useSelector((state) => state.user.value);

    const [isModalVisible, setModalVisible] = useState(false);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };


  return (
    <View style={styles.containerPage}>
    {/* Conteneur de l'icône de notification */}
    <View style={styles.containerNotif}>
      {/* Icône de notification */}
      <MaterialIcons
        style={styles.icone}
        name="notifications"
        size={34}
        color="#FFFFFF"
      />
    </View>

    {/* En-tête */}
    <View style={styles.containerHeader}>
      {/* Texte de bienvenue */}
      <Text style={styles.text}>
        Bonjour <Text style={styles.textDynamique}>{user.name}</Text>
      </Text>

      {/* Paragraphe d'introduction */}
      <Text style={styles.paragraphe}>Bienvenue sur Zéro</Text>

      {/* Barre de recherche */}
      <View style={styles.searchBarContainer}>
        {/* Conteneur de l'icône de loupe avec contour */}
        <View style={styles.searchIconContainer}>
          {/* Icône de loupe */}
          <FontAwesome
            name="search"
            size={20}
            color="#274539" // Couleur de l'icône de loupe
            style={styles.searchIcon}
          />
        </View>
        {/* Champ d'entrée de texte pour la recherche */}
        <TextInput
          style={styles.searchInput}
          placeholder="Je recherche..."
          placeholderTextColor="#707070"
        />
        <FontAwesome
          onPress={toggleModal}
          style={styles.iconeFilter}
          name="filter"
          size={28}
          color="#274539"
        />
      </View>

      {/* Icône "croix" pour fermer la modale */}
      {isModalVisible && (
        <FontAwesome
          onPress={toggleModal}
          style={styles.iconeClose}
          name="times"
          size={28}
          color="#FFFFFF"
        />
      )}
    </View>

    {/* Modale */}
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Icône "croix" pour fermer la modale depuis la modale elle-même */}
          <FontAwesome
            onPress={toggleModal}
            style={styles.iconeCloseModal}
            name="times"
            size={28}
            color="#274539"
          />
          <FilterScreen />
        </View>
      </View>
    </Modal>
  </View>
);
}

// Définition des styles utilisés dans le composant
const styles = StyleSheet.create({
  // Style du conteneur principal de la page
  containerPage: {
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 200,
  },

  // Style du conteneur de l'en-tête
  containerHeader: {
    backgroundColor: "#274539",
    width: "100%",
    height: 160,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingRight: 30,
    paddingLeft: 30,
  },

  // Style du texte "Bonjour"
  text: {
    fontFamily: "Montserrat",
    color: "white",
    fontSize: 30,
  },


  // Style du paragraphe d'introduction
  paragraphe: {
    color: "white",
    fontSize: 17,
    marginBottom: 15,
  },

  // Style du conteneur de l'icône de notification
  containerNotif: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },

  // Style du texte dynamique à l'intérieur du texte "Bonjour"
  textDynamique: {
    color: "#EDFC92",
  },

  // Style du conteneur de la barre de recherche
  searchBarContainer: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black", // Couleur de la bordure
    borderRadius: 30, // Arrondi des coins de la barre de recherche
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  // Style du conteneur de l'icône de loupe
  searchIconContainer: {
    backgroundColor: "#EDFC92", // Couleur de fond de l'icône de loupe
    borderRadius: 30, // Arrondi des coins de l'icône de loupe
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  // Style de l'icône de loupe
  searchIcon: {
    // marginRight: 10,
  },

  // Style du champ d'entrée de texte de recherche
  searchInput: {
    flex: 1,
    color: "#707070",
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: "Poppins",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(255, 255, 255, 0.9)', // Couleur de fond blanc semi-transparent
  // },
  modalContent: {
    width: '100%', // Largeur du contenu modal (vous pouvez ajuster selon vos besoins)
    backgroundColor: '#fff', // Couleur de fond blanc pur
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
   // Style de l'icône "croix" en haut à droite de l'en-tête
   iconeClose: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1, // Assurez-vous que l'icône est au-dessus de la modale
  },

  // Style de l'icône "croix" en haut à droite de la modale
  iconeCloseModal: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});







