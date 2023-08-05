import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import ArticleDetails from "../components/ArticleDetails";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterScreen from "./FilterScreen";

const Stack = createNativeStackNavigator();
const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;

export default function HomeScreenCharity({ navigation }) {
  const [posts, setPosts] = useState([]);
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
          setError("Erreur inconnue !");
        }
      })
      .catch((error) => {
        setError("Erreur lors de la récupération des posts :" + error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.cardsRow}>
          {posts.map((post, index) => (
            <ArticleDetails
              key={index}
              title={post.title}
              description={post.description.slice(0,25)}
              photo={post.photo[0]}
            />
          ))}
        </ScrollView>
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
    flex: 1,
    width: "100%",
    marginTop:20,
  },
  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  titre: {
    fontSize: 10,
    color: "white",
  },
});
