import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";
import NeedDetails from "../components/NeedDetails";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;
const Stack = createNativeStackNavigator();

export default function HomeScreenCompany({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appeler la fonction pour récupérer les posts depuis le backend ou une API REST
    fetchPosts();
  }, []);

  // Fonction pour récupérer les posts depuis le backend ou une API REST
  const fetchPosts = () => {
    fetch(`${BACK_URL}:3000/posts/charity`)
      .then((response) => response.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
        } else {
          setError("Unknown error!");
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
            <NeedDetails
              key={index}
              title={post.title}
              description={post.description.slice(0,25)+"..."}
            
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
