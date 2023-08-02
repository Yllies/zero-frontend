// Importation des composants et bibliothèques nécessaires
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
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as React from 'react';

// Définition du composant Header
export default function Header() {

  const user = useSelector((state) => state.user.value);
  return (
    // Conteneur principal de la page
    <View style={styles.containerPage}>
      {/* En-tête */}
      <View style={styles.containerHeader}>
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
            placeholder="Rechercher..."
            placeholderTextColor="#707070"
          />
        </View>
      </View>
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
    paddingBottom:200,
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
    fontFamily: "Poppins",
    color: "white",
    fontSize: 30,
  },

  // Style du paragraphe d'introduction
  paragraphe: {
    color: "white",
    fontSize: 17,
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
    borderColor: "#EDFC92", // Couleur de la bordure
    borderRadius: 30, // Arrondi des coins de la barre de recherche
  },

  // Style du conteneur de l'icône de loupe
  searchIconContainer: {
    backgroundColor: "#EDFC92", // Couleur de fond de l'icône de loupe
    borderRadius: 15, // Arrondi des coins de l'icône de loupe
    padding: 5,
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
  },
});
