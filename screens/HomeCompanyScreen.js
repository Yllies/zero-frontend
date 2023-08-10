// Import des dépendances nécessaires
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import NeedDetails from "../components/NeedDetails";

// URL de l'API back-end
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function HomeCompanyScreen({ navigation }) {
  // États locaux
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const user = useSelector((state) => state.user.value);

  // Effet au chargement initial
  useEffect(() => {
    fetchPosts();
  }, []);

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

  // Fonction pour récupérer les messages depuis l'API
  const fetchPosts = () => {
    fetch(`${BACK_URL}:3000/posts/charity`)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
          setSearchResults(data.posts);
        } else {
          setError("Unknown error!");
        }
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des posts :" + error.message);
      });
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

  // Rendu de l'interface utilisateur
  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <View style={styles.containerHeader}>
        {/* Icône de notifications */}
        <View style={styles.containerNotif}>
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
        <Text style={styles.paragraphe}>Bienvenue sur Zéro</Text>
        {/* Barre de recherche */}
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
        </View>
      </View>
      {/* Affichage des résultats */}
      <View style={styles.scrollViewContainer}>
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.cardsRow}
          renderItem={({ item }) => (
            <View style={styles.needContainer}>
            
                {/* Affichage des détails du besoin */}
                <NeedDetails
                  title={item.title}
                  description={item.description.slice(0, 25) + "..."}
                  category={item.category}
                  idPost={item.idPost}
                />
           
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollViewContainer: {
    marginTop: 20,
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
    // backgroundColor: "#274539",
    borderRadius: 40,
    padding: 10,
  },
  searchIconContainer: {
    backgroundColor: "#274539",
    borderRadius: 30,
    padding: 10,
  },
  containerHeader: {
    backgroundColor: "#274539",
    width: "100%",
    height: 160,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingRight: 30,
    paddingLeft: 30,
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
  containerNotif: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  textDynamique: {
    color: "#EDFC92",
  },
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EDFC92",
    borderRadius: 30,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

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
});
