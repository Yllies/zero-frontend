import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import ArticleDetails from "../components/ArticleDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterScreen from "./FilterScreen";

const Stack = createNativeStackNavigator();
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appeler la fonction pour récupérer les posts depuis le backend ou une API REST
    fetchPosts();
  }, []);

  // Fonction pour récupérer les posts depuis le backend ou une API REST
  const fetchPosts = () => {
    fetch(`${BACK_URL}:3000/posts/company`)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
        } else {
          setError(error,"Erreur inconnue !");
        }
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des posts :" + error.message);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />

        <View style={styles.cardsRow}>
          {posts.map((post, index) => (
            <ArticleDetails style={styles.titre}
              key={index}
              title={post.title}
              description={post.description.slice(0,25)}
              photo={post.photo[0]}
            />
          ))}
          
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  containerFilter: {
    marginTop: -218,
    marginRight: 40,
    paddingBottom: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingLeft: 300,
  },

  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    flexWrap: "wrap",
    // paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    fontSize:10,
  },

  cardContainer: {
    width: "48%",
    marginBottom: 10,
  },

  containerArticle: {
    backgroundColor: "#274539",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  titre: {
    fontSize: 10,
    color: "white",
    // marginBottom: 5,
  },

  paragraphe: {
    fontSize: 10,
    fontFamily: "Poppins",
    color: "white",
    marginBottom: -15,
  },

  infoContainer: {
    padding: 12,
  },

  donationImage: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  heartIcon: {
    paddingLeft: 130,
    paddingBottom: 1,
  },
  iconeFilter: {
    borderRadius: 400,
  },
});
