import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, logout } from "../reducers/user";
import { addToConfirm } from "../reducers/post";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function AccountScreen() {
  // Récupérer les informations de l'utilisateur depuis Redux
  const user = useSelector((state) => state.user.value);
  const post = useSelector((state) => state.post.value.toConfirm);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(true); // true pour déconnexion, false pour suppression de compte
  const [postToConfirm, setPostToConfirm] = useState(false);
  const isFocused = useIsFocused();
  // Gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    setShowModal(true);
    setConfirmAction(true); // On veut effectuer la déconnexion
  };

  // Gérer la suppression du compte de l'utilisateur
  const handleDelete = () => {
    setShowModal(true);
    setConfirmAction(false); // On veut effectuer la suppression du compte
  };

  // Confirmer la déconnexion de l'utilisateur
  const confirmLogout = () => {
    dispatch(logout());
    navigation.navigate("Login");
    setShowModal(false);
  };

  // Confirmer la suppression du compte de l'utilisateur
  const confirmDelete = () => {
    fetch(`${BACK_URL}:3000/users/delete/${user.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(removeUser({ token: data.token }));
          navigation.navigate("Login");
        }
      })
      .finally(() => {
        setShowModal(false);
      });
  };
  useEffect(() => {
    fetch(`${BACK_URL}:3000/posts/company/published/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        let isInWaiting = false;

        data.data.map((postInWaiting) => {
          if (postInWaiting.isBooked === "En attente") {
            isInWaiting = true;
            if (
              !post.map((elem) => elem.idPost).includes(postInWaiting.idPost)
            ) {
              dispatch(addToConfirm(postInWaiting));
            }
          }

          isInWaiting ? setPostToConfirm(true) : setPostToConfirm(false);
        });
      });
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.containerPage}>
      {/* En-tête */}
      <View style={styles.containerHeader}>
        <Text style={styles.text}>
          Bonjour <Text style={styles.textDynamique}>{user.name}</Text>
        </Text>

        <Text style={styles.paragraphe}> Votre compte</Text>

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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Contenu */}
        <View style={styles.containerOption}>
          {postToConfirm && user.type === "Entreprise" && (
            <TouchableOpacity
              onPress={() => navigation.navigate("PostsInWaiting")}
              style={styles.reservation}
            >
              <Text style={styles.textbtn}>
                Réservations en attente de confirmation
              </Text>
              <FontAwesome
                name="check"
                color="#274539"
                size={30}
                style={styles.icons}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => navigation.navigate("PostsPublished")}
          >
            <Text style={styles.textOptionBtn}>Annonces en lignes</Text>
          </TouchableOpacity>
          {user.type === "Entreprise" && (
            <TouchableOpacity style={styles.optionBtn}>
              <Text style={styles.textOptionBtn}>Historique des dons</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => {
              if (user.token) {
                navigation.navigate("UserProfile");
              } else {
                navigation.navigate("Login");
              }
            }}
          >
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
          <TouchableOpacity onPress={handleLogout} style={styles.btnDeco}>
            <Text style={styles.textBtn}>Déconnexion</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete} style={styles.btnSupp}>
            <Text style={styles.textBtn}>Supprimer mon compte</Text>
          </TouchableOpacity>
        </View>

        {/* Boîte de dialogue modale */}
        <Modal visible={showModal} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Êtes-vous sûr de vouloir continuer ?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmAction ? confirmLogout : confirmDelete}
                >
                  <Text style={styles.modalButtonText}>Confirmer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPage: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Poppins",
  },
  modalButtons: {
    flexDirection: "row",
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#EDFC92",
  },
  modalButtonText: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  scrollViewContent: {
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 120,
  },
  icone: {
    paddingTop: 0,
  },
  containerHeader: {
    backgroundColor: "#274539",
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  text: {
    fontFamily: "MontserratBold",
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
  paragraphe: {
    color: "white",
    fontSize: 17,
    paddingTop: "2%",
    fontFamily: "MontserratBold",
    textAlign: "center",
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
    alignItems: "center",
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
    fontSize: 15,
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
    textAlign: "center",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  btnDeco: {
    backgroundColor: "#EDFC92",
    width: "35%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    fontFamily: "Poppins",
    justifyContent: "center",
  },

  btnSupp: {
    fontFamily: "Poppins",
    backgroundColor: "#EDFC92",
    width: "50%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
  },

  textBtn: {
    color: "#274539",
    fontFamily: "Poppins",
    textAlign: "center",
    alignItems: "center",
    paddingTop: "12%",
    paddingBottom: "12%",
  },
});
