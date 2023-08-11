import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ArticleDetails from "../components/ArticleDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterScreen from "./FilterScreen";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function HomeCharityScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const quantity = useSelector((state) => state.filter.quantity);

  const date = useSelector((state) => state.filter.date);

  const displayFilter = useSelector((state) => state.filter.display);

  // const selectedLocalisation= useSelector(state => state.filter.localisation);

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  // const navigation = useNavigation();

  useEffect(() => {
    // Appeler la fonction pour récupérer les posts depuis le backend ou une API REST
    fetchPosts();
  }, [quantity, date, displayFilter]);

  const goToDonnationScreen = (postId) => {
    navigation.navigate("DonnationScreen", { postId: postId });
  };
  // Fonction pour récupérer les posts depuis le backend ou une API REST
  const fetchPosts = () => {
    if (displayFilter) {
      console.log("posts filtrés");
      // Fetch posts with filters applied
      fetch(
        `${BACK_URL}:3000/filter/company/posts/?quantity=${quantity}&date=${date}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result === true) {
            const filteredPosts = data.data.filter((post) => {
              const postQuantity = parseInt(post.quantity);
              if (!isNaN(postQuantity)) {
                return (
                  postQuantity >= quantity[0] && postQuantity <= quantity[1]
                );
              }
            });
            setPosts(filteredPosts);
          }
        })
        .catch((error) => {
          setError(
            "Erreur lors de la récupération des posts :" + error.message
          );
        });
    } else {
      // Fetch all posts without filters
      console.log("posts normaux");
      fetch(`${BACK_URL}:3000/posts/company`)
        .then((response) => response.json())
        .then((data) => {
          if (data.posts) {
            setPosts(data.posts);
          } else {
            setError("Erreur inconnue !");
          }
        })
        .catch((error) => {
          setError(
            "Erreur lors de la récupération des posts :" + error.message
          );
        });
    }
  };
  console.log("mon filtre sur homecharity", displayFilter);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerPage}>
        <View style={styles.containerHeader}>
          <View style={styles.containerNotif}>
            <MaterialIcons
              style={styles.icone}
              name="notifications"
              size={34}
              color="#FFFFFF"
            />
          </View>
          <Text style={styles.text}>
            Bonjour <Text style={styles.textDynamique}>{user.name}</Text>
          </Text>
          <Text style={styles.paragraphe}>Bienvenue sur Zéro</Text>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            {/* Contenu de la modal (FilterScreen) */}
            <FilterScreen onClose={toggleModal} />
          </View>
        </Modal>
      </View>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchIconContainer}>
          <FontAwesome
            name="search"
            size={20}
            color="#EDFC92"
            style={styles.searchIcon}
          />
        </View>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          {/* Contenu de la modal (FilterScreen) */}
          <FilterScreen onClose={toggleModal} />
        </View>
      </Modal>

      <FlatList
        style={styles.flatlist}
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.cardsRow}
        renderItem={({ item }) => (
          <View style={styles.needContainer}>
            <ArticleDetails
              title={item.title}
              description={item.description.slice(0, 25) + "..."}
              category={item.category}
              photo={item.photo[0]}
              idPost={item.idPost}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "flex-start",
  },

  scrollViewContainer: {
    marginTop: -20,
  },

  cardsRow: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  titre: {
    fontSize: 10,
    color: "white",
  },

  containerPage: {
    // flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "flex-start",
    width: "100%",
  },

  // Style du conteneur de l'en-tête
  containerHeader: {
    backgroundColor: "#274539",
    width: "100%",
    height: 180,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },

  // Style du texte "Bonjour"
  text: {
    fontFamily: "MontserratBold",
    color: "white",
    fontSize: 30,
  },

  // Style du paragraphe d'introduction
  paragraphe: {
    color: "white",
    fontSize: 17,
    marginBottom: 15,
    fontFamily: "MontserratBold",
  },

  iconeFilter: {
    padding: 5,
  },
  // Style du conteneur de l'icône de notification
  containerNotif: {
    marginTop: "3%",
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
    marginTop: -20,
    marginBottom: 5, // Add margin below the search bar
    marginLeft: 20, // Adjust the left margin
    marginRight: 20, // Adjust the right margin
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EDFC92",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1,
    marginBottom: "5%",
  },

  // Style du conteneur de l'icône de loupe
  searchIconContainer: {
    backgroundColor: "#274539", // Couleur de fond de l'icône de loupe
    borderRadius: 30, // Arrondi des coins de l'icône de loupe
    padding: 10,
    // borderWidth: 1,
    // borderColor: "black",
  },

  // Style de l'icône de loupe

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

  modalContent: {
    width: "100%", // Largeur du contenu modal (vous pouvez ajuster selon vos besoins)
    backgroundColor: "#fff", // Couleur de fond blanc pur
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
