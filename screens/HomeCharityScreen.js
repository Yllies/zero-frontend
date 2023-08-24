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
import { useIsFocused } from "@react-navigation/native";
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


  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);


  const isFocused = useIsFocused();
  
  useEffect(() => {
    // récupérer les posts depuis le backend 
    fetchPosts();
  }, [quantity, date, displayFilter, isFocused]);

  const goToDonnationScreen = (postId) => {
    navigation.navigate("HomeCharity", { postId: postId });
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
      console.log("posts normaux");

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

      <FlatList
        style={styles.flatlist}
        data={posts}
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
    fontSize: 16,
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
