import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BACK_URL = process.env.EXPO_PUBLIC_BACK_URL;
const Stack = createNativeStackNavigator();

export default function HomeScreenAsso({ navigation }) {
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
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <View style={styles.containerFilter}>
          <FontAwesome
            onPress={() => navigation.navigate("FilterScreen")}
            style={styles.iconeFilter}
            name="filter"
            size={28}
            color="#274539"
          />
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.cardsRow}>
            {posts.map((post) => (
              <View style={styles.cardContainer} key={post.id}>
                <TouchableOpacity style={styles.containerArticle}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.titre}>{post.title}</Text>
                    <Text style={styles.paragraphe}>{post.description.slice(0,25)} ...</Text>
                  </View>
                  <TouchableOpacity style={styles.heartIcon}>
                    <FontAwesome name="heart" size={20} color="#EDFC92" />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
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
    marginRight:40,
    paddingBottom: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingLeft: 300,
  },

  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
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
    fontSize: 17,
    color: "white",
    marginBottom: 5,
  },

  paragraphe: {
    fontSize: 12,
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
  iconeFilter:{
    borderRadius:400,
    
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
