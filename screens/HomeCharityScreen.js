import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ArticleDetails from "../components/ArticleDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterScreen from "./FilterScreen";
import { MaterialIcons } from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

// URL de l'API back-end
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function HomeCharityScreen({ navigation }) {
  // États locaux
  const user = useSelector((state) => state.user.value);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isFocused = useIsFocused();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const quantity = useSelector((state) => state.filter.quantity);
  const date = useSelector((state) => state.filter.date);
  const displayFilter = useSelector((state) => state.filter.display);

// Effet au chargement initial, récupérer les posts depuis le backend, se mettent à jour en fonction des actions dans les filtres 
  useEffect(() => {
    fetchPosts();
  }, [quantity, date, displayFilter, isFocused]);


    // Effet en cas de changement dans le champ de recherche ou le mode de recherche
  useEffect(() => {
    if (!isSearching) {
      setSearchResults(posts);
      return;
    }

    // Filtrage des messages en fonction du texte de recherche
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.description.toLowerCase().includes(searchText.toLowerCase()) ||
        post.category.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredPosts);
  }, [searchText, isSearching, posts]);

  const goToDonnationScreen = (postId) => {
    navigation.navigate("HomeCharity", { postId: postId });
  };


    // Gestion de la recherche
  const handleSearch = () => {
    if (searchText.trim() === "") {
      // Si le champ de recherche est vide, réinitialiser la recherche
      setSearchText("");
      setIsSearching(false);
      fetchPosts(); // Restaurer les messages d'origine
    } else {
      setIsSearching(true);
    }
  };

  // Gestion de l'effacement de la recherche
  const handleClearSearch = () => {
    setSearchText("");
    setIsSearching(false);
    fetchPosts(); // Restaurer les messages d'origine
  };


  const fetchPosts = () => {
    if (displayFilter) {
      console.log("posts filtrés");
      // Fetch posts avec les filtres appliqués
      fetch(
        `${BACK_URL}/filter/company/posts/?quantity=${quantity}&date=${date}`
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
      // Fetcher tous les posts sans le filtre
      fetch(`${BACK_URL}/posts/company`)
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
  
  // Rendu de l'interface utilisateur

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
          {/* Barre de recherche */}
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
            {/* Icône de recherche */}
        <TouchableOpacity
        style={styles.searchIconContainer} 
          onPress={handleSearch}
          >
          <FontAwesome
            name="search"
            size={20}
            color="#EDFC92"
            style={styles.searchIcon}
          />

      </TouchableOpacity>
       {/* Champ de recherche */}
        <TextInput
          style={styles.searchInput}
          placeholder="Je recherche..."
          placeholderTextColor="#707070"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={handleSearch}
        />

  {/* Icône d'effacement de la recherche */}
          {isSearching && (
            <TouchableOpacity
              style={styles.clearSearchIconContainer}
              onPress={handleClearSearch}
            >
              <FontAwesome
                name="times"
                size={20}
                color="#274539"
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          )}
        <FontAwesome
          onPress={toggleModal}
          style={styles.iconeFilter}
          name="filter"
          size={28}
          color="#274539"
        />
      </View>

      {/* Affichage des résultats */}
      <FlatList
        style={styles.flatlist}
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.cardsRow}
        renderItem={({ item }) => (
          <View>
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
  },

  cardsRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  titre: {
    fontSize: 10,
    color: "white",
  },

    clearSearchIconContainer: {
    padding: 5,
  },

  containerPage: {
    justifyContent: "flex-start",
    width: "100%",
  },

  containerHeader: {
    backgroundColor: "#274539",
    width: "100%",
    height: 160,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingRight: 30,
    paddingLeft: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontFamily: "MontserratBold",
    color: "white",
    fontSize: 30,
  },

  paragraphe: {
    color: "white",
    fontSize: 17,
    marginBottom: 15,
    fontFamily: "MontserratBold",
  },

  iconeFilter: {
    padding: 5,
  },

  
  containerNotif: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  textDynamique: {
    color: "#EDFC92",
  },

  searchBarContainer: {
    flexDirection: "row",
    marginTop: -20,
    marginBottom: 5, 
    marginLeft: 20, 
    marginRight: 20, 
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

  searchIconContainer: {
    backgroundColor: "#274539", 
    borderRadius: 30, 
    padding: 10,
  },

  searchInput: {
    flex: 1,
    color: "#707070",
    fontSize: 15,
    paddingLeft: 10,
    fontFamily: "Poppins",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  modalContent: {
    width: "100%", 
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  iconeClose: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1, 
  },

  iconeCloseModal: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
});
