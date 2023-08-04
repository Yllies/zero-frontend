import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function AccountScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const handleDelete = () => {
    fetch(`${BACK_URL}:3000/users/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount >= 1) {
          dispatch(removeUser({ token: data.token }));
          navigation.navigate("TabNavigator", { screen: "login" });
        }
      });
  };

  return (
    <SafeAreaView style={styles.containerPage}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            Name <Text style={styles.textDynamique}>{user.name}</Text>
          </Text>

          {/* Paragraphe d'introduction */}
          <Text style={styles.paragraphe}> Votre compte donneur </Text>

          <View style={styles.containerNote}>
            <TouchableOpacity style={styles.iconeHeader}>
              <FontAwesome
                name="star"
                color="#EDFC92"
                size={30}
                style={styles.icons}
              />
            </TouchableOpacity>
            <Text style={styles.paragraphe}> 4.9 </Text>
          </View>
        </View>

        {/* Contenu */}
        <View style={styles.containerOption}>
          <TouchableOpacity style={styles.reservation}>
            <Text style={styles.textbtn}>Réservations en cours</Text>

            <FontAwesome
              name="check"
              color="#274539"
              size={30}
              style={styles.icons}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.textOptionBtn}>Annonces en lignes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.textOptionBtn}>Historique des dons</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.textOptionBtn}>Mon profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.textOptionBtn}>Paramètres</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.textOptionBtn}>Sécurité</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.textOptionBtn}>Aide</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btnDeco}>
            <Text>Déconnexion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnSupp}
            onPress={() => handleDelete()}
          >
            <Text style={styles.textBtn}>Supprimer mon compte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollViewContent: {
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 120,
  },

  containerHeader: {
    backgroundColor: "#274539",
    width: "100%",
    height: "28%",
    paddingTop: "10%",
    paddingRight: 30,
    paddingLeft: 30,
  },

  text: {
    fontFamily: "Montserrat",
    color: "white",
    fontSize: 30,
  },

  paragraphe: {
    color: "white",
    fontSize: 17,
    paddingTop: "2%",
  },

  containerNotif: {
    paddingTop: "7%",
    paddingLeft: "5%",
    paddingBottom: "3%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  textDynamique: {
    color: "#EDFC92",
  },

  containerNote: {
    flexDirection: "row",
    paddingTop: "5%",
  },

  containerOption: {
    paddingTop: "10%",
    alignItems: "center", // Align all buttons in the center horizontally
  },

  reservation: {
    width: "90%",
    height: 100,
    backgroundColor: "#EDFC92",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
  },

  textbtn: {
    color: "#274539",
    fontSize: 17,
  },

  btn: {
    color: "#274539",
    fontSize: 17,
  },

  optionBtn: {
    width: "90%",
    height: 50,
    backgroundColor: "#274539",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
  },

  textOptionBtn: {
    color: "white",
    fontSize: 15,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingRight: "5%",
    paddingLeft: "2%",
    paddingTop: "10%",
  },

  btnDeco: {
    backgroundColor: "#EDFC92",
    padding: "4%",
    width: "35%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
  },

  btnSupp: {
    backgroundColor: "#274539",
    padding: "4%",
    width: "50%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center",
    marginBottom: 25,
  },

  textBtn: {
    color: "white",
  },
});
